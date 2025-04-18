const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  createNotification
} = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotifications).post(protect, admin, createNotification);
router.route('/:id/read').put(protect, markAsRead);
router.route('/read-all').put(protect, markAllAsRead);

module.exports = router;