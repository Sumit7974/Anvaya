const express = require('express');

const {
  getPendingWorkers,
  verifyWorker
} = require('../controllers/adminController');

const {
  protect,
  authorize
} = require('../middleware/authMiddleware');

const router = express.Router();


// Get workers waiting for verification
router.get(
  '/workers/pending',
  protect,
  authorize('admin', 'superadmin'),
  getPendingWorkers
);


// Verify or reject worker
router.patch(
  '/workers/:workerId/verify',
  protect,
  authorize('admin', 'superadmin'),
  verifyWorker
);


module.exports = router;