const mongoose = require('mongoose');

const contractorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    verification: {
      status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
      documents: [{ type: String }]
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contractor', contractorSchema);