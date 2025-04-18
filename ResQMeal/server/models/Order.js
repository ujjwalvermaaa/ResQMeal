const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'NGO'
    },
    foodItems: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'FoodItem'
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        price: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'in-transit', 'delivered', 'cancelled'],
      default: 'pending'
    },
    deliveryDetails: {
      address: {
        type: String,
        required: true
      },
      contact: {
        type: String,
        required: true
      },
      deliveryTime: {
        type: Date,
        required: true
      },
      specialInstructions: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);