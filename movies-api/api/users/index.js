import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get a single user by username
router.get('/:username', asyncHandler(async (req, res) => {
  const user = await User.findByUserName(req.params.username);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: 'User not found.'
    });
  }

  return res.status(200).json({
    username: user.username,
    favorites: user.favorites || []
  });
}));

// Add a movie to user's favorites
router.post('/:username/favorites', asyncHandler(async (req, res) => {
  const user = await User.findByUserName(req.params.username);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: 'User not found.'
    });
  }

  const movieId = Number(req.body.movieId);

  if (!movieId) {
    return res.status(400).json({
      success: false,
      msg: 'movieId is required.'
    });
  }

  if (!user.favorites) {
    user.favorites = [];
  }

  if (!user.favorites.includes(movieId)) {
    user.favorites.push(movieId);
    await user.save();
  }

  return res.status(200).json({
    success: true,
    favorites: user.favorites
  });
}));

// Remove a movie from user's favorites
router.delete('/:username/favorites/:movieId', asyncHandler(async (req, res) => {
  const user = await User.findByUserName(req.params.username);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: 'User not found.'
    });
  }

  const movieId = Number(req.params.movieId);

  if (!user.favorites) {
    user.favorites = [];
  }

  user.favorites = user.favorites.filter((id) => id !== movieId);
  await user.save();

  return res.status(200).json({
    success: true,
    favorites: user.favorites
  });
}));

// Register / Authenticate User
router.post('/', asyncHandler(async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      success: false,
      msg: 'Username and password are required.'
    });
  }

  if (req.query.action === 'register') {
    return registerUser(req, res);
  }

  return authenticateUser(req, res);
}));

async function registerUser(req, res) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/;

  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      code: 400,
      msg: 'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.'
    });
  }

  await User.create(req.body);

  return res.status(201).json({
    success: true,
    msg: 'User successfully created.'
  });
}

async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);

  if (!user) {
    return res.status(401).json({
      success: false,
      msg: 'Authentication failed. User not found.'
    });
  }

  const isMatch = await user.comparePassword(req.body.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      msg: 'Wrong password.'
    });
  }

  const token = jwt.sign(
    {
      username: user.username,
      _id: user._id
    },
    process.env.SECRET
  );

  return res.status(200).json({
    success: true,
    token: 'BEARER ' + token
  });
}

export default router;