const FAQ = require('../models/FAQ');
const asyncHandler = require('express-async-handler');

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
const getFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find({}).sort({ createdAt: -1 });
  res.json(faqs);
});

// @desc    Create new FAQ
// @route   POST /api/faqs
// @access  Private/Admin
const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  const faq = await FAQ.create({
    question,
    answer
  });

  res.status(201).json(faq);
});

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
// @access  Private/Admin
const updateFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);

  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }

  faq.question = req.body.question || faq.question;
  faq.answer = req.body.answer || faq.answer;

  const updatedFAQ = await faq.save();
  res.json(updatedFAQ);
});

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
// @access  Private/Admin
const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);

  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }

  await faq.remove();
  res.json({ message: 'FAQ removed' });
});

module.exports = {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
};