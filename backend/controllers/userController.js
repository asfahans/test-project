import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @Desc    Auth user & get token
// @Route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      title: user.title,
      name: user.name,
      designation: user.designation,
      department: user.department,
      assignedVessels: user.assignedVessels,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @Desc    Register a new user
// @Route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    password,
    title,
    name,
    designation,
    department,
    assignedVessels,
    isAdmin,
    isActive,
  } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error('User already exist');
  }

  const user = await User.create({
    username,
    password,
    title,
    name,
    designation,
    department,
    assignedVessels,
    isAdmin,
    isActive,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      title: user.title,
      name: user.name,
      designation: user.designation,
      department: user.department,
      assignedVessels: user.assignedVessels,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @Desc    Get user profile
// @Route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      title: user.title,
      name: user.name,
      designation: user.designation,
      department: user.department,
      assignedVessels: user.assignedVessels,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    });
  } else {
    res.status(404);
    throw new Error('User not found ');
  }
});

// @Desc    Update user profile
// @Route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.title = req.body.title || user.title;
    user.name = req.body.name || user.name;
    user.designation = req.body.designation || user.designation;
    user.department = req.body.department || user.department;
    user.assignedVessels = req.body.assignedVessels || user.assignedVessels;
    if (req.body.isAdmin !== undefined) {
      user.isAdmin = req.body.isAdmin;
    }
    if (req.body.isActive !== undefined) {
      user.isActive = req.body.isActive;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      title: updatedUser.title,
      name: updatedUser.name,
      designation: updatedUser.designation,
      department: updatedUser.department,
      assignedVessels: updatedUser.assignedVessels,
      isAdmin: updatedUser.isAdmin,
      isActive: updatedUser.isActive,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found ');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
