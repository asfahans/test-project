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

export { authUser, getUserProfile };
