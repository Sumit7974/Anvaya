const express = require('express');
const { sendQuote, acceptQuote, rejectQuote } = require('../controllers/quoteController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.patch('/:bookingId/send', protect, validateObjectId('bookingId'), authorize('worker'), sendQuote);
router.patch('/:bookingId/accept', protect, validateObjectId('bookingId'), authorize('customer'), acceptQuote);
router.patch('/:bookingId/reject', protect, validateObjectId('bookingId'), authorize('customer'), rejectQuote);

module.exports = router;