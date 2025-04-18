const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem');
const NGO = require('../models/NGO');
const asyncHandler = require('express-async-handler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { foodItems, deliveryDetails } = req.body;

  // Verify NGO status
  const ngo = await NGO.findOne({ userId: req.user._id });
  if (!ngo || !ngo.verified) {
    res.status(403);
    throw new Error('Only verified NGOs can place orders');
  }

  // Check food items availability
  for (const item of foodItems) {
    const foodItem = await FoodItem.findById(item.itemId);
    if (!foodItem || !foodItem.isAvailable || foodItem.quantity < item.quantity) {
      res.status(400);
      throw new Error(`Food item ${item.itemId} is not available in the requested quantity`);
    }
  }

  // Calculate total price
  const itemsWithDetails = await Promise.all(
    foodItems.map(async (item) => {
      const foodItem = await FoodItem.findById(item.itemId);
      return {
        itemId: item.itemId,
        quantity: item.quantity,
        price: foodItem.discountPrice || foodItem.originalPrice,
        name: foodItem.name
      };
    })
  );

  const totalPrice = itemsWithDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Create order
  const order = await Order.create({
    userId: req.user._id,
    ngoId: ngo._id,
    foodItems: itemsWithDetails,
    totalPrice,
    status: 'pending',
    deliveryDetails
  });

  // Update food items quantity
  for (const item of foodItems) {
    await FoodItem.findByIdAndUpdate(item.itemId, {
      $inc: { quantity: -item.quantity }
    });
  }

  res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('userId', 'name email')
    .populate('ngoId', 'ngoName')
    .populate('foodItems.itemId', 'name image');

  if (order) {
    // Check if the user is authorized to view this order
    if (
      order.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      res.status(401);
      throw new Error('Not authorized to view this order');
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .populate('foodItems.itemId', 'name image');

  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate('userId', 'name')
    .populate('ngoId', 'ngoName');

  res.json(orders);
});

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders
};