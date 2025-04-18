const mongoose = require('mongoose');

const ngoSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    ngoName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    beneficiaries: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    website: {
      type: String
    },
    image: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('NGO', ngoSchema);