const express = require('express');
const router = express.Router();
const {
  getFoodItems,
  getFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem
} = require('../controllers/foodController');
const { protect, restaurant } = require('../middleware/authMiddleware');

router.route('/').get(getFoodItems).post(protect, restaurant, createFoodItem);
router
  .route('/:id')
  .get(getFoodItem)
  .put(protect, restaurant, updateFoodItem)
  .delete(protect, restaurant, deleteFoodItem);

module.exports = router;