const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  getMessage,
  deleteMessage
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(createMessage).get(protect, admin, getMessages);
router.route('/:id').get(protect, admin, getMessage).delete(protect, admin, deleteMessage);

module.exports = router;