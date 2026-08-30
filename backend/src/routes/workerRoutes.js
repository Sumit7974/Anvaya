const express = require('express');

const {
  updateProfile,
  toggleAvailability,
  getAllWorkers,
  getNearbyWorkers,
  uploadVerificationDoc,
  matchService,
  getProfile
} = require('../controllers/workerController');

const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all workers
router.get('/', protect, getAllWorkers);
router.get('/nearby', protect, getNearbyWorkers);

// Get logged-in worker's profile
router.get('/profile', protect, authorize('worker'), getProfile);

// Match customer's problem to a service
router.post('/match-service', protect, matchService);

// Update worker profile
router.patch('/profile', protect, authorize('worker'), updateProfile);

// Toggle worker availability
router.patch('/availability', protect, authorize('worker'), toggleAvailability);

// Upload verification document
router.post(
  '/verification/upload',
  protect,
  authorize('worker'),
  upload.single('document'),
  uploadVerificationDoc
);

module.exports = router;