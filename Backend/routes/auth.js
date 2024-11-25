const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userValidationRules = require('../validators/userValidation');
const User = require('../models/User');
const router = express.Router(); // Router-level middleware
const { generateToken } = require('../utils/token'); // Ensure proper import
const fetchuser = require('../middlewares/fetchuser');

// Route to create a new user
router.post('/createuser', userValidationRules(), async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance with hashed password
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the user
    const token = generateToken(user);

    // Respond with success (exclude sensitive fields like the password)
    res.status(201).json({
      message: 'User created successfully',
      token, // Include the JWT token in the response
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Check for duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({
        error: 'Email already exists',
      });
    }

    // Handle other errors during database operations
    console.log('Error', error);
    res.status(500).json({ error: 'Server error. Could not create user.' });
  }
});

// Authenticate a User using: POST http://localhost:8080/api/auth/login
router.post('/login', async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(user);

    // Respond with success
    res.status(200).json({
      message: 'Login successful',
      token, // Include the JWT token in the response
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: 'Server error. Could not log in.' });
  }
});

// Route 3 : Get user Using : POST http://localhost:8080/api/auth/login

router.post('/getuser',fetchuser, async (req, res) => {
try {
  const id = req.user.id;
  const user = await User.findById(id).select("-password")
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server Error")
}

});



module.exports = router;
