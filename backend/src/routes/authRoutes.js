const { protect, authorize } = require('../middleware/authMiddleware');
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({
    message: 'Auth route is working'
  });
});
router.get('/protected-test', protect, (req, res) => {
  res.status(200).json({
    message: 'Protected route is working',
    user: req.user
  });
});
router.get('/customer-test', protect, authorize('customer'), (req, res) => {
  res.status(200).json({
    message: 'Customer access granted',
    user: req.user
  });
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;