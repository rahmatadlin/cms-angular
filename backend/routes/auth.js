const express = require('express');
const { auth } = require('../middleware/auth');
const {
  login,
  getCurrentUser,
  logout,
  changePassword
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.post('/logout', auth, logout);
router.post('/change-password', auth, changePassword);

module.exports = router; 