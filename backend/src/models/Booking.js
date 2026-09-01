const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: value => {
          if (!Array.isArray(value) || value.length !== 2) return false;
          const [longitude, latitude] = value;
          return Number.isFinite(longitude)
            && Number.isFinite(latitude)
            && longitude >= -180
            && longitude <= 180
            && latitude >= -90
            && latitude <= 90;
        },
        message: 'Location must contain valid [longitude, latitude] coordinates'
      }
    }
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    problemDescription: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
    serviceTag: { type: String, trim: true, lowercase: true, enum: ['electrician', 'plumber', 'carpenter', 'painter', 'mason'] },
    quote: {
      amount: { type: Number, min: 1, max: 10000000 },
      note: { type: String, trim: true, maxlength: 500 },
      proposedAt: { type: Date },
      customerRespondedAt: { type: Date }
    },
    status: {
      type: String,
      enum: ['requested', 'quote-pending', 'accepted', 'in-progress', 'completion-pending', 'completed', 'disputed', 'rejected', 'customer-rejected', 'cancelled'],
      default: 'requested',
      index: true
    },
    location: { type: pointSchema, required: true },
    price: { type: Number, min: 1, max: 10000000 },
    rating: {
      score: { type: Number, min: 1, max: 5 },
      review: { type: String, maxlength: 300, trim: true }
    },
    payment: {
      orderId: String,
      paymentId: String,
      signature: String,
      status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
      paidAt: Date
    },
    acceptedAt: Date,
    startedAt: Date,
    completionRequestedAt: Date,
    customerConfirmedAt: Date,
    disputedAt: Date,
    rejectedAt: Date,
    rejectionReason: { type: String, maxlength: 300, trim: true },
    completedAt: Date
  },
  { timestamps: true }
);

bookingSchema.index({ location: '2dsphere' });
bookingSchema.index({ customer: 1, createdAt: -1 });
bookingSchema.index({ worker: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
