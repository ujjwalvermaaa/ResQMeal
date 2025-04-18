const User = require('../models/User');
const NGO = require('../models/Ngo');
const Restaurant = require('../models/Restaurant');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    role
  });

  // Create profile based on role
  if (role === 'ngo') {
    await NGO.create({
      userId: user._id,
      ngoName: name,
      address,
      phone,
      verified: false
    });
  } else if (role === 'restaurant') {
    await Restaurant.create({
      userId: user._id,
      name,
      address,
      contact: phone
    });
  }

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  let profile = null;
  if (user.role === 'ngo') {
    profile = await NGO.findOne({ userId: user._id });
  } else if (user.role === 'restaurant') {
    profile = await Restaurant.findOne({ userId: user._id });
  }

  res.json({
    user,
    profile
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    // Update profile based on role
    if (user.role === 'ngo') {
      await NGO.findOneAndUpdate(
        { userId: user._id },
        {
          ngoName: req.body.name || user.name,
          address: req.body.address || user.address,
          phone: req.body.phone || user.phone
        },
        { new: true }
      );
    } else if (user.role === 'restaurant') {
      await Restaurant.findOneAndUpdate(
        { userId: user._id },
        {
          name: req.body.name || user.name,
          address: req.body.address || user.address,
          contact: req.body.phone || user.phone
        },
        { new: true }
      );
    }

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};