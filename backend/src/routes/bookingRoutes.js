const express = require('express');
const {
  createBooking,
  getAvailableBookings,
  acceptBooking,
  startBooking,
  completeBooking,
  cancelBooking,
  getMyBookings,
  rateBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('customer'), createBooking);
router.get('/available', protect, authorize('worker'), getAvailableBookings);
router.get('/my', protect, authorize('customer'), getMyBookings);
router.post('/:bookingId/rating', protect, authorize('customer'), rateBooking);
router.patch('/:bookingId/accept', protect, authorize('worker'), acceptBooking);
router.patch('/:bookingId/start', protect, authorize('worker'), startBooking);
router.patch('/:bookingId/complete', protect, authorize('worker'), completeBooking);
router.patch('/:bookingId/cancel', protect, authorize('customer'), cancelBooking);
module.exports = router;