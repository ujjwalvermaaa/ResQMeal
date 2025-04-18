const express = require('express');
const router = express.Router();
const {
  getNGOs,
  getNGO,
  getMyNGOProfile,
  updateNGOProfile,
  verifyNGO
} = require('../controllers/ngoController');
const { protect, admin, ngo } = require('../middleware/authMiddleware');

router.route('/').get(getNGOs);
router.route('/:id').get(getNGO);
router.route('/profile/me').get(protect, ngo, getMyNGOProfile);
router.route('/profile/me').put(protect, ngo, updateNGOProfile);
router.route('/:id/verify').put(protect, admin, verifyNGO);

module.exports = router;