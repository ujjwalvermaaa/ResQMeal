const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');
const { protect, admin, ngo } = require('../middleware/authMiddleware');

router.route('/').post(protect, ngo, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;