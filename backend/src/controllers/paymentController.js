const crypto = require('crypto');
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) return res.status(400).json({ message: 'bookingId is required' });
    const booking = await Booking.findOne({ _id: bookingId, customer: req.user.id }).populate('worker', 'name');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'completed' || !booking.customerConfirmedAt) return res.status(400).json({ message: 'Customer must confirm satisfactory work before payment' });
    if (!booking.price || booking.price <= 0) return res.status(400).json({ message: 'No worker-approved price is available for this booking' });
    if (booking.payment?.status === 'paid') return res.status(409).json({ message: 'This booking has already been paid' });

    const amountPaise = Math.round(Number(booking.price) * 100);
    const order = await razorpay.orders.create({ amount: amountPaise, currency: 'INR', receipt: `booking_${booking._id}` });
    booking.payment = { orderId: order.id, status: 'pending' };
    await booking.save();
    return res.status(201).json({ message: 'Order created', orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ message: 'Server error creating order' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return res.status(400).json({ message: 'Missing payment verification fields' });
    const booking = await Booking.findOne({ _id: bookingId, customer: req.user.id });
    if (!booking || !booking.payment || booking.payment.orderId !== razorpay_order_id) return res.status(404).json({ message: 'Booking/order mismatch' });
    if (booking.payment.status === 'paid') return res.status(200).json({ message: 'Payment already verified', payment: booking.payment });

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return res.status(500).json({ message: 'Payment gateway is not configured' });
    const expectedSignature = crypto.createHmac('sha256', secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    const expected = Buffer.from(expectedSignature, 'utf8');
    const received = Buffer.from(String(razorpay_signature), 'utf8');
    const valid = expected.length === received.length && crypto.timingSafeEqual(expected, received);
    if (!valid) { booking.payment.status = 'failed'; await booking.save(); return res.status(400).json({ message: 'Payment verification failed' }); }

    booking.payment.paymentId = razorpay_payment_id;
    booking.payment.signature = razorpay_signature;
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