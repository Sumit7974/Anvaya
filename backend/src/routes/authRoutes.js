const express = require('express');
const rateLimit = require('express-rate-limit');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per IP per window
  message: { message: 'Too many login attempts, please try again after 15 minutes' }
});

const roles = ['customer', 'worker', 'admin', 'contractor'];

roles.forEach((role) => {
  router.post(`/${role}/register`, registerUser(role));
  router.post(`/${role}/login`, loginLimiter, loginUser(role));
});

module.exports = router;