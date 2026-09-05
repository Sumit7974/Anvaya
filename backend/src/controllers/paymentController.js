const crypto = require('crypto');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error('Payment gateway is not configured');
  return { client: new Razorpay({ key_id: keyId, key_secret: keySecret }), keyId, keySecret };
};

const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body || {};
    if (!bookingId || !mongoose.isValidObjectId(bookingId)) return res.status(400).json({ message: 'A valid bookingId is required' });

    const booking = await Booking.findOne({ _id: bookingId, customer: req.user.id }).populate('worker', 'name');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'completed' || !booking.customerConfirmedAt) return res.status(400).json({ message: 'Customer must confirm satisfactory work before payment' });
    if (!Number.isFinite(Number(booking.price)) || booking.price <= 0) return res.status(400).json({ message: 'No worker-approved price is available for this booking' });
    if (booking.payment?.status === 'paid') return res.status(409).json({ message: 'This booking has already been paid' });

    const { client, keyId } = getRazorpay();
    if (booking.payment?.status === 'pending' && booking.payment.orderId) {
      return res.status(200).json({ message: 'Existing payment order', orderId: booking.payment.orderId, amount: Math.round(Number(booking.price) * 100), currency: 'INR', keyId });
    }

    const amountPaise = Math.round(Number(booking.price) * 100);
    if (!Number.isSafeInteger(amountPaise) || amountPaise < 100 || amountPaise > 1000000000) return res.status(400).json({ message: 'Payment amount is outside the supported range' });

    const order = await client.orders.create({ amount: amountPaise, currency: 'INR', receipt: `booking_${booking._id}` });
    booking.payment = { orderId: order.id, status: 'pending' };
    await booking.save();
    return res.status(201).json({ message: 'Order created', orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ message: error.message === 'Payment gateway is not configured' ? error.message : 'Server error creating order' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!bookingId || !mongoose.isValidObjectId(bookingId) || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return res.status(400).json({ message: 'Missing valid payment verification fields' });

    const booking = await Booking.findOne({ _id: bookingId, customer: req.user.id });
    if (!booking || !booking.payment?.orderId || booking.payment.orderId !== razorpay_order_id) return res.status(404).json({ message: 'Booking/order mismatch' });
    if (booking.payment.status === 'paid') return res.status(200).json({ message: 'Payment already verified', payment: booking.payment });
    if (booking.status !== 'completed' || !booking.customerConfirmedAt || !Number.isFinite(Number(booking.price)) || booking.price <= 0) {
      return res.status(400).json({ message: 'Payment is only available after customer-confirmed completion' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return res.status(500).json({ message: 'Payment gateway is not configured' });
    const expectedSignature = crypto.createHmac('sha256', secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    const received = String(razorpay_signature);
    const expected = Buffer.from(expectedSignature, 'utf8');
    const actual = Buffer.from(received, 'utf8');
    const valid = expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
    if (!valid) return res.status(400).json({ message: 'Payment verification failed' });

    booking.payment.paymentId = razorpay_payment_id;
    booking.payment.signature = received;
    booking.payment.status = 'paid';
    booking.payment.paidAt = new Date();
    await booking.save();
    return res.status(200).json({ message: 'Payment verified successfully', payment: booking.payment });
  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({ message: 'Server error verifying payment' });
  }
};

module.exports = { createOrder, verifyPayment };
