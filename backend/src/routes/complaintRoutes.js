const express = require('express');
const { createComplaint, getMyComplaints } = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('customer'), createComplaint);
router.get('/my', protect, authorize('customer'), getMyComplaints);

module.exports = router;