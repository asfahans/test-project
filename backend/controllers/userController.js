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
    if (user.isActive) {
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
        isAssistant: user.isAssistant,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Inactive user');
    }
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
    isAssistant,
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
    isAssistant,
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
      isAssistant: user.isAssistant,
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
      isAssistant: user.isAssistant,
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

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      title: updatedUser.title,
      name: updatedUser.name,
      designation: updatedUser.designation,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found ');
  }
});

// @Desc    Get all users
// @Route   GET /api/users
// @access  Private / Admin
const getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;

  const users = await User.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { designation: { $regex: keyword, $options: 'i' } },
      { department: { $regex: keyword, $options: 'i' } },
    ],
  });
  res.json(users);
});

// @Desc    Delete a user
// @Route   DELETE /api/users/:id
// @access  Private / Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @Desc    Get user by Id
// @Route   GET /api/users/:id
// @access  Private / Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @Desc    Update user
// @Route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.title = req.body.title || user.title;
    user.name = req.body.name || user.name;
    user.designation = req.body.designation || user.designation;
    user.department = req.body.department || user.department;
    user.assignedVessels = req.body.assignedVessels || user.assignedVessels;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.isAdmin !== undefined) {
      user.isAdmin = req.body.isAdmin;
    }
    if (req.body.isActive !== undefined) {
      user.isActive = req.body.isActive;
    }
    if (req.body.isAssistant !== undefined) {
      user.isAssistant = req.body.isAssistant;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      title: updatedUser.title,
      name: updatedUser.name,
      password: updatedUser.password,
      designation: updatedUser.designation,
      department: updatedUser.department,
      assignedVessels: updatedUser.assignedVessels,
      isAdmin: updatedUser.isAdmin,
      isActive: updatedUser.isActive,
      isAssistant: updatedUser.isAssistant,
    });
  } else {
    res.status(404);
    throw new Error('User not found ');
  }
});

export {
  authUser,
  getUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
};
