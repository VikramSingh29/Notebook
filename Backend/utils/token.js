const jwt = require('jsonwebtoken');
const SECRET_KEY = 'thisisaSecret'; // Store securely in environment variables

// Function to generate a JWT token without expiration
const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  // No 'expiresIn' specified for a token that doesn't expire
  return jwt.sign(payload, SECRET_KEY);
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY); // Decoded payload if valid
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, verifyToken };
