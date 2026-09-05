const express = require('express');

const {
  getPendingWorkers,
  verifyWorker,
  updateWorkerStatus
} = require('../controllers/adminController');

const {
  protect,
  authorize
} = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

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
  validateObjectId('workerId'),
  authorize('admin', 'superadmin'),
  verifyWorker
);


// Suspend or reactivate worker
router.patch(
  '/workers/:workerId/status',
  protect,
  validateObjectId('workerId'),
  authorize('admin', 'superadmin'),
  updateWorkerStatus
);


module.exports = router;
