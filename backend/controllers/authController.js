const jwt = require('jsonwebtoken');
const User = require('../models/user');
const express = require('express');
const app = express();
app.use(express.json());

const authController = {
  login: async (req, res) => {
    try {
      receivedData = req.body;
      username = receivedData.username;
      password = receivedData.password;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({ 
          error: 'Username and password are required' 
        });
      }

      // Find user by username
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          error: 'Invalid username or password' 
        });
      }

      // Validate password
      const isValidPassword = (password === user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          error: 'Invalid username or password' 
        });
      }

      // Return user data and token
      res.json({
        message: 'Login successful',
        status: 200,
        user: {
          username: user.username,
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        error: 'An error occurred during login' 
      });
    }
  }
};

module.exports = authController; 