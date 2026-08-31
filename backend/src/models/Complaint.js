const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    raisedByModel: { type: String, enum: ['Customer', 'Worker'], required: true },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'raisedByModel' },
    againstModel: { type: String, enum: ['Customer', 'Worker'], required: true },
    against: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'againstModel' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    description: { type: String, required: true },
    evidence: [{ type: String }],
    status: { type: String, enum: ['open', 'under-review', 'resolved', 'dismissed'], default: 'open' },
    adminAction: {
      action: { type: String, enum: ['none', 'warned', 'suspended'], default: 'none' },
      by: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      notes: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);