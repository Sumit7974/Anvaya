const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

const createBooking = async (req, res) => {
  try {
    const {
      problemDescription,
      serviceTag,
      location,
      workerId
    } = req.body;

    if (
      !problemDescription ||
      typeof problemDescription !== 'string' ||
      !problemDescription.trim()
    ) {
      return res.status(400).json({
        message: 'Problem description is required'
      });
    }

    const bookingData = {
      customer: req.user.id,
      problemDescription: problemDescription.trim(),
      serviceTag,
      location
    };

    if (workerId) {
      const worker = await Worker.findById(workerId);

      if (!worker || !worker.isActive) {
        return res.status(400).json({
          message:
            'Selected worker is unavailable or suspended'
        });
      }

      if (
        worker.verification.status !== 'verified'
      ) {
        return res.status(400).json({
          message:
            'Selected worker is not verified yet'
        });
      }

      if (!worker.isAvailable) {
        return res.status(400).json({
          message:
            'Selected worker is currently unavailable'
        });
      }

      /*
       * IMPORTANT:
       * Selecting a worker does NOT mean the worker accepted.
       * The booking stays requested until the worker accepts.
       */
      bookingData.worker = workerId;
      bookingData.status = 'requested';
    }

    const booking = await Booking.create(
      bookingData
    );

    return res.status(201).json({
      message:
        'Booking request created successfully',
      booking
    });
  } catch (error) {
    console.error(
      'Create booking error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const getAvailableBookings = async (
  req,
  res
) => {
  try {
    const bookings = await Booking.find({
      status: 'requested',
      worker: null
    })
      .populate(
        'customer',
        'name phone email'
      )
      .sort({
        createdAt: -1
      });

    return res.status(200).json({
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error(
      'Get available bookings error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const getWorkerBookings = async (
  req,
  res
) => {
  try {
    const worker =
      await Worker.findById(
        req.user.id
      ).select(
        'name email phone skills isAvailable isActive verification rating'
      );

    if (!worker) {
      return res.status(404).json({
        message: 'Worker not found'
      });
    }

    const bookings =
      await Booking.find({
        worker: req.user.id
      })
        .populate(
          'customer',
          'name phone email'
        )
        .sort({
          createdAt: -1
        });

    return res.status(200).json({
      count: bookings.length,
      bookings,
      worker: {
        _id: worker._id,
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        skills: worker.skills,
        isAvailable:
          worker.isAvailable,
        isActive:
          worker.isActive,
        verification:
          worker.verification,
        rating: worker.rating
      }
    });
  } catch (error) {
    console.error(
      'Get worker bookings error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const acceptBooking = async (
  req,
  res
) => {
  try {
    const { bookingId } =
      req.params;

    const worker =
      await Worker.findById(
        req.user.id
      );

    if (
      !worker ||
      !worker.isActive
    ) {
      return res.status(403).json({
        message:
          'Your account is inactive or suspended. You cannot accept jobs.'
      });
    }

    if (
      worker.verification.status !==
      'verified'
    ) {
      return res.status(403).json({
        message:
          'Your account is not verified yet. You cannot accept jobs.'
      });
    }

    if (!worker.isAvailable) {
      return res.status(403).json({
        message:
          'You must be available to accept jobs.'
      });
    }

    const booking =
      await Booking.findOne({
        _id: bookingId,
        worker: req.user.id,
        status: 'requested'
      });

    if (!booking) {
      return res.status(404).json({
        message:
          'Booking not found or no longer available'
      });
    }

    booking.status =
      'accepted';

    booking.acceptedAt =
      new Date();

    await booking.save();

    return res.status(200).json({
      message:
        'Booking accepted successfully',
      booking
    });
  } catch (error) {
    console.error(
      'Accept booking error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const rejectBooking = async (
  req,
  res
) => {
  try {
    const {
      bookingId
    } = req.params;

    const {
      reason
    } = req.body || {};

    const worker =
      await Worker.findById(
        req.user.id
      );

    if (
      !worker ||
      !worker.isActive
    ) {
      return res.status(403).json({
        message:
          'Your account is inactive or suspended.'
      });
    }

    if (
      worker.verification.status !==
      'verified'
    ) {
      return res.status(403).json({
        message:
          'Your account is not verified yet.'
      });
    }

    const booking =
      await Booking.findOne({
        _id: bookingId,
        worker: req.user.id,
        status: 'requested'
      });

    if (!booking) {
      return res.status(404).json({
        message:
          'Booking not found or already processed'
      });
    }

    booking.status =
      'rejected';

    booking.rejectedAt =
      new Date();

    booking.rejectionReason =
      typeof reason === 'string'
        ? reason.trim().slice(0, 300)
        : '';

    await booking.save();

    return res.status(200).json({
      message:
        'Booking rejected successfully',
      booking
    });
  } catch (error) {
    console.error(
      'Reject booking error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const startBooking = async (
  req,
  res
) => {
  try {
    const {
      bookingId
    } = req.params;

    const worker =
      await Worker.findById(
        req.user.id
      );

    if (
      !worker ||
      !worker.isActive
    ) {
      return res.status(403).json({
        message:
          'Your account is inactive or suspended.'
      });
    }

    if (
      worker.verification.status !==
      'verified'
    ) {
      return res.status(403).json({
        message:
          'Your account is not verified yet.'
      });
    }

    const booking =
      await Booking.findOne({
        _id: bookingId,
        worker: req.user.id,
        status: 'accepted'
      });

    if (!booking) {
      return res.status(404).json({
        message:
          'Booking not found or cannot be started'
      });
    }

    booking.status =
      'in-progress';

    booking.startedAt =
      new Date();

    await booking.save();

    return res.status(200).json({
      message:
        'Booking started successfully',
      booking
    });
  } catch (error) {
    console.error(
      'Start booking error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const requestCompletion =
  async (req, res) => {
    try {
      const {
        bookingId
      } = req.params;

      const worker =
        await Worker.findById(
          req.user.id
        );

      if (
        !worker ||
        !worker.isActive
      ) {
        return res.status(403).json({
          message:
            'Your account is inactive or suspended.'
        });
      }

      if (
        worker.verification.status !==
        'verified'
      ) {
        return res.status(403).json({
          message:
            'Your account is not verified yet.'
        });
      }

      const booking =
        await Booking.findOne({
          _id: bookingId,
          worker: req.user.id,
          status: 'in-progress'
        });

      if (!booking) {
        return res.status(404).json({
          message:
            'Booking not found or completion cannot be requested'
        });
      }

      booking.status =
        'completion-pending';

      booking.completionRequestedAt =
        new Date();

      await booking.save();

      return res.status(200).json({
        message:
          'Completion request sent to customer',
        booking
      });
    } catch (error) {
      console.error(
        'Request completion error:',
        error
      );

      return res.status(500).json({
        message: 'Server error'
      });
    }
  };

const confirmCompletion =
  async (req, res) => {
    try {
      const {
        bookingId
      } = req.params;

      const booking =
        await Booking.findOne({
          _id: bookingId,
          customer: req.user.id,
          status: 'completion-pending'
        });

      if (!booking) {
        return res.status(404).json({
          message:
            'Booking not found or is not waiting for confirmation'
        });
      }

      booking.status =
        'completed';

      booking.customerConfirmedAt =
        new Date();

      booking.completedAt =
        new Date();

      await booking.save();

      return res.status(200).json({
        message:
          'Work confirmed successfully',
        booking
      });
    } catch (error) {
      console.error(
        'Confirm completion error:',
        error
      );

      return res.status(500).json({
        message: 'Server error'
      });
    }
  };

const disputeCompletion =
  async (req, res) => {
    try {
      const {
        bookingId
      } = req.params;

      const booking =
        await Booking.findOne({
          _id: bookingId,
          customer: req.user.id,
          status: 'completion-pending'
        });

      if (!booking) {
        return res.status(404).json({
          message:
            'Booking not found or is not waiting for confirmation'
        });
      }

      booking.status =
        'disputed';

      booking.disputedAt =
        new Date();

      await booking.save();

      return res.status(200).json({
        message:
          'Completion disputed. Payment remains locked.',
        booking
      });
    } catch (error) {
      console.error(
        'Dispute completion error:',
        error
      );

      return res.status(500).json({
        message: 'Server error'
      });
    }
  };

const cancelBooking = async (
  req,
  res
) => {
  try {
    const {
      bookingId
    } = req.params;

    const booking =
      await Booking.findOne({
        _id: bookingId,
        customer: req.user.id,
        status: {
          $in: [
            'requested',
            'accepted'
          ]
        }
      });

    if (!booking) {
      return res.status(404).json({
        message:
          'Booking not found or cannot be cancelled'
      });
    }

    booking.status =
      'cancelled';

    await booking.save();

    return res.status(200).json({
      message:
        'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error(
      'Cancel booking error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find({
        customer: req.user.id
      })
        .populate(
          'worker',
          'name phone skills rating isAvailable verification'
        )
        .sort({
          createdAt: -1
        });

    return res.status(200).json({
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error(
      'Get my bookings error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

const rateBooking = async (
  req,
  res
) => {
  try {
    const {
      bookingId
    } = req.params;

    const {
      score,
      review
    } = req.body;

    const numericScore =
      Number(score);

    if (
      !Number.isFinite(
        numericScore
      ) ||
      numericScore < 1 ||
      numericScore > 5
    ) {
      return res.status(400).json({
        message:
          'Rating score must be between 1 and 5'
      });
    }

    const booking =
      await Booking.findOne({
        _id: bookingId,
        customer: req.user.id,
        status: 'completed'
      });

    if (!booking) {
      return res.status(404).json({
        message:
          'Completed booking not found'
      });
    }

    if (
      booking.rating &&
      booking.rating.score
    ) {
      return res.status(400).json({
        message:
          'Booking has already been rated'
      });
    }

    if (!booking.worker) {
      return res.status(400).json({
        message:
          'Cannot rate a booking without a worker'
      });
    }

    const worker =
      await Worker.findById(
        booking.worker
      );

    if (!worker) {
      return res.status(404).json({
        message:
          'Worker not found'
      });
    }

    booking.rating = {
      score: numericScore,
      review:
        typeof review === 'string'
          ? review.trim()
          : ''
    };

    const oldCount =
      worker.rating.count || 0;

    const oldAverage =
      worker.rating.average || 0;

    const newCount =
      oldCount + 1;

    const newAverage =
      ((oldAverage * oldCount) +
        numericScore) /
      newCount;

    worker.rating.count =
      newCount;

    worker.rating.average =
      Number(
        newAverage.toFixed(2)
      );

    await booking.save();
    await worker.save();

    return res.status(200).json({
      message:
        'Rating submitted successfully',
      rating:
        booking.rating,
      workerRating: {
        average:
          worker.rating.average,
        count:
          worker.rating.count
      }
    });
  } catch (error) {
    console.error(
      'Rate booking error:',
      error
    );

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  createBooking,
  getAvailableBookings,
  getWorkerBookings,
  acceptBooking,
  rejectBooking,
  startBooking,
  requestCompletion,
  confirmCompletion,
  disputeCompletion,
  cancelBooking,
  getMyBookings,
  rateBooking
};