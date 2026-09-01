const Complaint = require('../models/Complaint');
const Booking = require('../models/Booking');

const createComplaint = async (req, res) => {
  try {
    const { bookingId, category, description } = req.body;

    if (!bookingId || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ message: 'bookingId and complaint description are required' });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user.id
    }).select('customer worker status');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!booking.worker) {
      return res.status(400).json({ message: 'This booking has no worker to report against' });
    }

    const complaint = await Complaint.create({
      raisedByModel: 'Customer',
      raisedBy: req.user.id,
      againstModel: 'Worker',
      against: booking.worker,
      booking: booking._id,
      description: category
        ? `[${String(category).trim().slice(0, 80)}] ${description.trim().slice(0, 1500)}`
        : description.trim().slice(0, 1500)
    });

    if (booking.status === 'completion-pending') {
      booking.status = 'disputed';
      booking.disputedAt = new Date();
      await booking.save();
    }

    return res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      raisedByModel: 'Customer',
      raisedBy: req.user.id
    })
      .populate('booking', 'status serviceTag price createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: complaints.length,
      complaints
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createComplaint, getMyComplaints };