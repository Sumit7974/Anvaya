const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    problemDescription: { type: String, required: true },
    serviceTag: { type: String }, // filled by the "AI understands problem" logic on Day 3
    status: {
      type: String,
      enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled'],
      default: 'requested'
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    price: { type: Number },
    rating: {
      score: { type: Number, min: 1, max: 5 },
      review: { type: String }
    },
    acceptedAt: { type: Date },
    startedAt: { type: Date },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

bookingSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Booking', bookingSchema);