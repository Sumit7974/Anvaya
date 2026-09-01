const crypto = require('crypto');
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    if (!bookingId || !amount) {
      return res.status(400).json({ message: 'bookingId and amount are required' });
    }

    const booking = await Booking.findOne({ _id: bookingId, customer: req.user.id });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Booking must be completed before payment' });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt: `booking_${booking._id}`
    });

    booking.payment = { orderId: order.id, status: 'pending' };
    booking.price = Number(amount);
    await booking.save();

    res.status(201).json({
      message: 'Order created',
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment verification fields' });
    }

    const booking = await Booking.findOne({ _id: bookingId, customer: req.user.id });

    if (!booking || !booking.payment || booking.payment.orderId !== razorpay_order_id) {
      return res.status(404).json({ message: 'Booking/order mismatch' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      booking.payment.status = 'failed';
      await booking.save();
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    booking.payment.paymentId = razorpay_payment_id;
    booking.payment.signature = razorpay_signature;
    booking.payment.status = 'paid';
    await booking.save();

    res.status(200).json({ message: 'Payment verified successfully', payment: booking.payment });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Server error verifying payment' });
  }
};

module.exports = { createOrder, verifyPayment };