const express = require('express');

const {
  createBooking,
  getAvailableBookings,
  getWorkerBookings,
  acceptBooking,
  rejectBooking,
  startBooking,
  requestCompletion,
  confirmCompletion,
  disputeCompletion,
  cancelBooking,
  getMyBookings,
  rateBooking
} = require('../controllers/bookingController');

const {
  protect,
  authorize
} = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

const router =
  express.Router();

router.post(
  '/',
  protect,
  authorize('customer'),
  createBooking
);

router.get(
  '/available',
  protect,
  authorize('worker'),
  getAvailableBookings
);

router.get(
  '/worker',
  protect,
  authorize('worker'),
  getWorkerBookings
);

router.get(
  '/my',
  protect,
  authorize('customer'),
  getMyBookings
);

router.patch(
  '/:bookingId/accept',
  protect,
  validateObjectId('bookingId'),
  authorize('worker'),
  acceptBooking
);

router.patch(
  '/:bookingId/reject',
  protect,
  validateObjectId('bookingId'),
  authorize('worker'),
  rejectBooking
);

router.patch(
  '/:bookingId/start',
  protect,
  validateObjectId('bookingId'),
  authorize('worker'),
  startBooking
);

router.patch(
  '/:bookingId/request-completion',
  protect,
  validateObjectId('bookingId'),
  authorize('worker'),
  requestCompletion
);

router.patch(
  '/:bookingId/confirm-completion',
  protect,
  validateObjectId('bookingId'),
  authorize('customer'),
  confirmCompletion
);

router.patch(
  '/:bookingId/dispute-completion',
  protect,
  validateObjectId('bookingId'),
  authorize('customer'),
  disputeCompletion
);

router.patch(
  '/:bookingId/cancel',
  protect,
  validateObjectId('bookingId'),
  authorize('customer'),
  cancelBooking
);

router.post(
  '/:bookingId/rating',
  protect,
  validateObjectId('bookingId'),
  authorize('customer'),
  rateBooking
);

module.exports = router;