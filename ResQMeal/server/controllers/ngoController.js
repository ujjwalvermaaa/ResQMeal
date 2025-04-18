const NGO = require('../models/NGO');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all NGOs
// @route   GET /api/ngos
// @access  Public
const getNGOs = asyncHandler(async (req, res) => {
  const { verified } = req.query;
  let query = {};

  if (verified) {
    query.verified = verified === 'true';
  }

  const ngos = await NGO.find(query).populate('userId', 'name email');
  res.json(ngos);
});

// @desc    Get single NGO
// @route   GET /api/ngos/:id
// @access  Public
const getNGO = asyncHandler(async (req, res) => {
  const ngo = await NGO.findById(req.params.id).populate('userId', 'name email phone address');

  if (ngo) {
    res.json(ngo);
  } else {
    res.status(404);
    throw new Error('NGO not found');
  }
});

// @desc    Get my NGO profile
// @route   GET /api/ngos/profile/me
// @access  Private/NGO
const getMyNGOProfile = asyncHandler(async (req, res) => {
  const ngo = await NGO.findOne({ userId: req.user._id }).populate('userId', 'name email phone address');

  if (ngo) {
    res.json(ngo);
  } else {
    res.status(404);
    throw new Error('NGO not found');
  }
});

// @desc    Update NGO profile
// @route   PUT /api/ngos/profile/me
// @access  Private/NGO
const updateNGOProfile = asyncHandler(async (req, res) => {
  const ngo = await NGO.findOne({ userId: req.user._id });

  if (ngo) {
    ngo.ngoName = req.body.ngoName || ngo.ngoName;
    ngo.address = req.body.address || ngo.address;
    ngo.phone = req.body.phone || ngo.phone;
    ngo.beneficiaries = req.body.beneficiaries || ngo.beneficiaries;
    ngo.description = req.body.description || ngo.description;
    ngo.website = req.body.website || ngo.website;
    ngo.image = req.body.image || ngo.image;

    const updatedNGO = await ngo.save();
    res.json(updatedNGO);
  } else {
    res.status(404);
    throw new Error('NGO not found');
  }
});

// @desc    Verify NGO
// @route   PUT /api/ngos/:id/verify
// @access  Private/Admin
const verifyNGO = asyncHandler(async (req, res) => {
  const ngo = await NGO.findById(req.params.id);

  if (ngo) {
    ngo.verified = true;
    const updatedNGO = await ngo.save();
    res.json(updatedNGO);
  } else {
    res.status(404);
    throw new Error('NGO not found');
  }
});

module.exports = {
  getNGOs,
  getNGO,
  getMyNGOProfile,
  updateNGOProfile,
  verifyNGO
};