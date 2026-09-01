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
      required: true,
      trim: true,
      maxlength: 2000
    },
    serviceTag: {
      type: String,
      trim: true,
      lowercase: true
    },
    quote: {
      amount: { type: Number, min: 1 },
      note: { type: String, trim: true, maxlength: 500 },
      proposedAt: { type: Date },
      customerRespondedAt: { type: Date }
    },
    status: {
      type: String,
      enum: [
        'requested',
        'quote-pending',
        'accepted',
        'in-progress',
        'completion-pending',
        'completed',
        'disputed',
        'rejected',
        'customer-rejected',
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
      type: Number,
      min: 1
    },
    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      review: {
        type: String,
        maxlength: 300,
        trim: true
      }
    },
    payment: {
      orderId: String,
      paymentId: String,
      signature: String,
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
      }
    },
    acceptedAt: Date,
    startedAt: Date,
    completionRequestedAt: Date,
    customerConfirmedAt: Date,
    disputedAt: Date,
    rejectedAt: Date,
    rejectionReason: {
      type: String,
      maxlength: 300,
      trim: true
    },
    completedAt: Date
  },
  { timestamps: true }
);

bookingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);