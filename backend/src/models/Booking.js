const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker'
    },

    problemDescription: {
      type: String,
      required: true
    },

    serviceTag: {
      type: String
    },

    status: {
      type: String,
      enum: [
        'requested',
        'accepted',
        'in-progress',
        'completion-pending',
        'completed',
        'disputed',
        'rejected',
        'cancelled'
      ],
      default: 'requested'
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },

    price: {
      type: Number
    },

    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      review: {
        type: String
      }
    },

    payment: {
      orderId: {
        type: String
      },
      paymentId: {
        type: String
      },
      signature: {
        type: String
      },
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
      }
    },

    acceptedAt: {
      type: Date
    },

    startedAt: {
      type: Date
    },

    completionRequestedAt: {
      type: Date
    },

    customerConfirmedAt: {
      type: Date
    },

    disputedAt: {
      type: Date
    },

    rejectedAt: {
      type: Date
    },

    rejectionReason: {
      type: String
    },

    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.index({
  location: '2dsphere'
});

module.exports = mongoose.model(
  'Booking',
  bookingSchema
);