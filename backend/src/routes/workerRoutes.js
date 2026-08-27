const express = require('express');
const {
  updateProfile,
  toggleAvailability,
  getAllWorkers,
  uploadVerificationDoc
} = require('../controllers/workerController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', protect, getAllWorkers);
router.patch('/profile', protect, authorize('worker'), updateProfile);
router.patch('/availability', protect, authorize('worker'), toggleAvailability);
router.post('/verification/upload', protect, authorize('worker'), upload.single('document'), uploadVerificationDoc);

module.exports = router;