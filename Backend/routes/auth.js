const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userValidationRules = require('../validators/userValidation');
const User = require('../models/User');
const router = express.Router(); // Router-level middleware
const { generateToken } = require('../utils/token'); // Ensure proper import
const fetchuser = require('../middlewares/fetchuser');

// Helper function to handle errors
const handleError = (res, status, message, error = null) => {
  if (error) console.error('Error:', error);
  res.status(status).json({ error: message });
};

// Route to create a new user
router.post('/createuser', userValidationRules(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate a JWT token
    const token = generateToken(user);

    // Respond with success (exclude password)
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    handleError(res, 500, 'Server error. Could not create user.', error);
  }
});

// Authenticate a user
router.post('/login', async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success, error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    success = true;

    res.status(200).json({
      success,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    handleError(res, 500, 'Server error. Could not log in.', error);
  }
});

// Route to get user details
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    handleError(res, 500, 'Internal server error', error);
  }
});

module.exports = router;
