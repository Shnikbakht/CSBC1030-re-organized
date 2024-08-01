const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const { users } = require('../models/users.json');

const handleUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body; // Assuming username and password are sent in the request body
    // Perform authentication logic here (e.g., check username/password against user data)
    // So for now we can only login if the username is "usernameTest" and the password is "passwordTest"
    if (username === 'usernameTest' && password === 'passwordTest') {
      // Generate JWT token
      const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' }); // Change 'secret_key' to your actual secret key
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Authentication middleware
// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // No token provided
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = decoded;
    // Set decoded token payload directly to req.user
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = {
  handleUserLogin,
  authenticateToken,
};
