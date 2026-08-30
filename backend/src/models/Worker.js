const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    skills: [
      {
        type: String,
        trim: true
      }
    ],

    isAvailable: {
      type: Boolean,
      default: false
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

    verification: {
      status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
      },

      documents: [
        {
          type: String
        }
      ],

      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
      },

      verifiedAt: {
        type: Date
      }
    },

    rating: {
      average: {
        type: Number,
        default: 0
      },

      count: {
        type: Number,
        default: 0
      }
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

workerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Worker', workerSchema);