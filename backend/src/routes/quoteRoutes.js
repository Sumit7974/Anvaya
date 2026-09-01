const express = require('express');
const { sendQuote, acceptQuote, rejectQuote } = require('../controllers/quoteController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/:bookingId/send', protect, authorize('worker'), sendQuote);
router.patch('/:bookingId/accept', protect, authorize('customer'), acceptQuote);
router.patch('/:bookingId/reject', protect, authorize('customer'), rejectQuote);

module.exports = router;