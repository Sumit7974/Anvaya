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
  authorize('worker'),
  acceptBooking
);

router.patch(
  '/:bookingId/reject',
  protect,
  authorize('worker'),
  rejectBooking
);

router.patch(
  '/:bookingId/start',
  protect,
  authorize('worker'),
  startBooking
);

router.patch(
  '/:bookingId/request-completion',
  protect,
  authorize('worker'),
  requestCompletion
);

router.patch(
  '/:bookingId/confirm-completion',
  protect,
  authorize('customer'),
  confirmCompletion
);

router.patch(
  '/:bookingId/dispute-completion',
  protect,
  authorize('customer'),
  disputeCompletion
);

router.patch(
  '/:bookingId/cancel',
  protect,
  authorize('customer'),
  cancelBooking
);

router.post(
  '/:bookingId/rating',
  protect,
  authorize('customer'),
  rateBooking
);

module.exports = router;