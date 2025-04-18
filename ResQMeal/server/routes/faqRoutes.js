const express = require('express');
const router = express.Router();
const {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
} = require('../controllers/faqController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getFAQs).post(protect, admin, createFAQ);
router.route('/:id').put(protect, admin, updateFAQ).delete(protect, admin, deleteFAQ);

module.exports = router;