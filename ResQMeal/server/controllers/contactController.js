const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

// @desc    Create new message
// @route   POST /api/contact
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const newMessage = await Message.create({
    name,
    email,
    subject,
    message
  });

  // Send email notification
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`
  };

  await transporter.sendMail(mailOptions);

  res.status(201).json(newMessage);
});

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
});

// @desc    Get single message
// @route   GET /api/contact/:id
// @access  Private/Admin
const getMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    res.json(message);
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    await message.remove();
    res.json({ message: 'Message removed' });
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  deleteMessage
};