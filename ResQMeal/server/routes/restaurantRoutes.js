const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurant,
  getMyRestaurantProfile,
  updateRestaurantProfile,
  getRestaurantStats
} = require('../controllers/restaurantController');
const { protect, restaurant } = require('../middleware/authMiddleware');

router.route('/').get(getRestaurants);
router.route('/:id').get(getRestaurant);
router.route('/profile/me').get(protect, restaurant, getMyRestaurantProfile);
router.route('/profile/me').put(protect, restaurant, updateRestaurantProfile);
router.route('/stats/me').get(protect, restaurant, getRestaurantStats);

module.exports = router;