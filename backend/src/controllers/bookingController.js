const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { problemDescription, serviceTag, location } = req.body;

    if (!problemDescription) {
      return res.status(400).json({
        message: 'Problem description is required'
      });
    }

    const booking = await Booking.create({
      customer: req.user.id,
      problemDescription,
      serviceTag,
      location
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

const getAvailableBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      status: 'requested',
      worker: null
    })
      .populate('customer', 'name phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get available bookings error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      status: 'requested',
      worker: null
    });

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found or already assigned'
      });
    }

    booking.worker = req.user.id;
    booking.status = 'accepted';
    booking.acceptedAt = new Date();

    await booking.save();

    res.status(200).json({
      message: 'Booking accepted successfully',
      booking
    });
  } catch (error) {
    console.error('Accept booking error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
const startBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      worker: req.user.id,
      status: 'accepted'
    });

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found or cannot be started'
      });
    }

    booking.status = 'in-progress';
    booking.startedAt = new Date();

    await booking.save();

    res.status(200).json({
      message: 'Booking started successfully',
      booking
    });
  } catch (error) {
    console.error('Start booking error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      worker: req.user.id,
      status: 'in-progress'
    });

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found or cannot be completed'
      });
    }

    booking.status = 'completed';
    booking.completedAt = new Date();

    await booking.save();

    res.status(200).json({
      message: 'Booking completed successfully',
      booking
    });
  } catch (error) {
    console.error('Complete booking error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user.id,
      status: { $in: ['requested', 'accepted'] }
    });

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found or cannot be cancelled'
      });
    }

    booking.status = 'cancelled';

    await booking.save();

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user.id
    })
      .populate('worker', 'name phone skills rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get my bookings error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
const rateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { score, review } = req.body;

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({
        message: 'Rating score must be between 1 and 5'
      });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user.id,
      status: 'completed'
    });

    if (!booking) {
      return res.status(404).json({
        message: 'Completed booking not found'
      });
    }

    if (booking.rating && booking.rating.score) {
      return res.status(400).json({
        message: 'Booking has already been rated'
      });
    }

    booking.rating = {
      score: Number(score),
      review: review || ''
    };

    await booking.save();

    res.status(200).json({
      message: 'Rating submitted successfully',
      rating: booking.rating
    });
  } catch (error) {
    console.error('Rate booking error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  createBooking,
  getAvailableBookings,
  acceptBooking,
  startBooking,
  completeBooking,
  cancelBooking,
  getMyBookings,
  rateBooking
};