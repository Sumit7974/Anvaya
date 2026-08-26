const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    contractor: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor', required: true },
    title: { type: String, required: true },
    description: { type: String },
    workersRequired: [
      {
        skill: { type: String, required: true },
        count: { type: Number, required: true, min: 1 }
      }
    ],
    assignedWorkers: [
      {
        worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
        status: { type: String, enum: ['invited', 'accepted', 'rejected'], default: 'invited' }
      }
    ],
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    status: { type: String, enum: ['draft', 'open', 'in-progress', 'completed'], default: 'draft' }
  },
  { timestamps: true }
);

projectSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Project', projectSchema);