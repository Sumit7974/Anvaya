const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

const sendQuote = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { amount, note = '' } = req.body;
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) return res.status(400).json({ message: 'A valid quote amount is required' });

    const worker = await Worker.findById(req.user.id);
    if (!worker || !worker.isActive || worker.verification.status !== 'verified') return res.status(403).json({ message: 'Worker is not eligible to quote' });

    const booking = await Booking.findOne({ _id: bookingId, worker: req.user.id, status: 'accepted' });
    if (!booking) return res.status(404).json({ message: 'Accepted booking not found' });

    booking.quote = { amount: Math.round(numericAmount), note: String(note).trim().slice(0, 500), proposedAt: new Date() };
    booking.price = Math.round(numericAmount);
    booking.status = 'quote-pending';
    await booking.save();
    return res.status(200).json({ message: 'Quote sent to customer', booking });
  } catch (error) {
    console.error('Send quote error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const acceptQuote = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.bookingId, customer: req.user.id, status: 'quote-pending' });
    if (!booking) return res.status(404).json({ message: 'Quote not found or already processed' });
    booking.status = 'accepted';
    booking.acceptedAt = new Date();
    booking.quote.customerRespondedAt = new Date();
    booking.price = booking.quote.amount;
    await booking.save();
    return res.status(200).json({ message: 'Quote accepted', booking });
  } catch (error) {
    console.error('Accept quote error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const rejectQuote = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.bookingId, customer: req.user.id, status: 'quote-pending' });
    if (!booking) return res.status(404).json({ message: 'Quote not found or already processed' });
    booking.status = 'customer-rejected';
    booking.rejectedAt = new Date();
    booking.rejectionReason = typeof req.body?.reason === 'string' ? req.body.reason.trim().slice(0, 300) : 'Customer rejected the worker quote';
    booking.quote.customerRespondedAt = new Date();
    await booking.save();
    return res.status(200).json({ message: 'Quote rejected', booking });
  } catch (error) {
    console.error('Reject quote error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendQuote, acceptQuote, rejectQuote };