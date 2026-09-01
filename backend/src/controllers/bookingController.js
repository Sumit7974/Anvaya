const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

const MAX_SERVICE_RADIUS_KM = 15;
const RESPONSE_WINDOW_MS = 2 * 60 * 1000;
const VALID_SERVICES = new Set(['electrician', 'plumber', 'carpenter', 'painter', 'mason']);

const normalizePoint = location => {
  if (!location || location.type !== 'Point' || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) return null;
  const [longitude, latitude] = location.coordinates.map(Number);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) return null;
  return { type: 'Point', coordinates: [longitude, latitude] };
};

const expireTimedOutBookings = async () => {
  const now = new Date();
  const expired = await Booking.find({ status: 'requested', worker: { $ne: null }, responseDeadlineAt: { $lte: now } }).select('_id worker');
  if (!expired.length) return 0;
  await Booking.updateMany({ _id: { $in: expired.map(b => b._id) }, status: 'requested' }, { $set: { status: 'expired', expiredAt: now, rejectionReason: 'Worker did not respond within the response window' } });
  const workerIds = [...new Set(expired.map(b => String(b.worker)).filter(Boolean))];
  if (workerIds.length) await Worker.updateMany({ _id: { $in: workerIds } }, { $set: { isAvailable: true } });
  return expired.length;
};

const createBooking = async (req, res) => {
  try {
    const { problemDescription, serviceTag, location, workerId } = req.body || {};
    const point = normalizePoint(location);
    if (typeof problemDescription !== 'string' || problemDescription.trim().length < 10) return res.status(400).json({ message: 'Please describe the problem in at least 10 characters' });
    if (!point) return res.status(400).json({ message: 'A valid service location is required' });

    const normalizedService = typeof serviceTag === 'string' ? serviceTag.trim().toLowerCase() : '';
    if (normalizedService && !VALID_SERVICES.has(normalizedService)) return res.status(400).json({ message: 'Invalid service type' });

    const bookingData = { customer: req.user.id, problemDescription: problemDescription.trim().slice(0, 2000), serviceTag: normalizedService || undefined, location: point, status: 'requested' };

    if (workerId) {
      const workerFilter = { _id: workerId, isActive: true, isAvailable: true, 'verification.status': 'verified', location: { $near: { $geometry: point, $maxDistance: MAX_SERVICE_RADIUS_KM * 1000 } } };
      if (normalizedService) workerFilter.skills = normalizedService;
      // Reserve the selected worker immediately so another customer cannot book them during this response window.
      const worker = await Worker.findOneAndUpdate(workerFilter, { $set: { isAvailable: false } }, { new: true }).select('_id name isActive isAvailable verification skills');
      if (!worker) return res.status(400).json({ message: 'Selected worker is unavailable, unverified, outside the service area, or does not provide this service' });
      bookingData.worker = worker._id;
      bookingData.responseDeadlineAt = new Date(Date.now() + RESPONSE_WINDOW_MS);
    }

    try {
      const booking = await Booking.create(bookingData);
      return res.status(201).json({ message: 'Booking request created successfully', booking });
    } catch (createError) {
      if (bookingData.worker) await Worker.updateOne({ _id: bookingData.worker }, { $set: { isAvailable: true } });
      throw createError;
    }
  } catch (error) {
    console.error('Create booking error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAvailableBookings = async (req, res) => {
  try {
    await expireTimedOutBookings();
    const bookings = await Booking.find({ status: 'requested', worker: null }).populate('customer', 'name phone email').sort({ createdAt: -1 }).limit(200);
    return res.status(200).json({ count: bookings.length, bookings });
  } catch (error) { console.error('Get available bookings error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const getWorkerBookings = async (req, res) => {
  try {
    await expireTimedOutBookings();
    const worker = await Worker.findById(req.user.id).select('name email phone skills isAvailable isActive verification rating');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    const bookings = await Booking.find({ worker: req.user.id }).populate('customer', 'name phone email').sort({ createdAt: -1 }).limit(200);
    return res.status(200).json({ count: bookings.length, bookings, worker: { _id: worker._id, name: worker.name, email: worker.email, phone: worker.phone, skills: worker.skills, isAvailable: worker.isAvailable, isActive: worker.isActive, verification: worker.verification, rating: worker.rating } });
  } catch (error) { console.error('Get worker bookings error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const acceptBooking = async (req, res) => {
  try {
    await expireTimedOutBookings();
    const worker = await Worker.findOneAndUpdate({ _id: req.user.id, isActive: true, isAvailable: true, 'verification.status': 'verified' }, { $set: { isAvailable: false } }, { new: true });
    if (!worker) return res.status(403).json({ message: 'You must be active, verified, and available to accept a job.' });

    const booking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, worker: req.user.id, status: 'requested', $or: [{ responseDeadlineAt: { $exists: false } }, { responseDeadlineAt: { $gt: new Date() } }] }, { $set: { status: 'accepted', acceptedAt: new Date(), responseDeadlineAt: undefined } }, { new: true });
    if (!booking) {
      await Worker.updateOne({ _id: req.user.id }, { $set: { isAvailable: true } });
      return res.status(404).json({ message: 'Booking not found, expired, or no longer available' });
    }
    return res.status(200).json({ message: 'Booking accepted successfully', booking });
  } catch (error) { console.error('Accept booking error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const rejectBooking = async (req, res) => {
  try {
    await expireTimedOutBookings();
    const worker = await Worker.findById(req.user.id);
    if (!worker || !worker.isActive) return res.status(403).json({ message: 'Your account is inactive or suspended.' });
    if (worker.verification.status !== 'verified') return res.status(403).json({ message: 'Your account is not verified yet.' });
    const reason = typeof req.body?.reason === 'string' ? req.body.reason.trim().slice(0, 300) : '';
    const booking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, worker: req.user.id, status: 'requested' }, { $set: { status: 'rejected', rejectedAt: new Date(), rejectionReason: reason } }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found or already processed' });
    await Worker.updateOne({ _id: req.user.id }, { $set: { isAvailable: true } });
    return res.status(200).json({ message: 'Booking rejected successfully', booking });
  } catch (error) { console.error('Reject booking error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const startBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, worker: req.user.id, status: 'accepted', 'quote.amount': { $exists: true, $gte: 1 }, 'quote.customerRespondedAt': { $exists: true } }, { $set: { status: 'in-progress', startedAt: new Date() } }, { new: true });
    if (!booking) return res.status(400).json({ message: 'Work cannot start until the worker sends a quote and the customer accepts it.' });
    return res.status(200).json({ message: 'Booking started successfully', booking });
  } catch (error) { console.error('Start booking error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const requestCompletion = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, worker: req.user.id, status: 'in-progress' }, { $set: { status: 'completion-pending', completionRequestedAt: new Date() } }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found or completion cannot be requested' });
    return res.status(200).json({ message: 'Completion request sent to customer', booking });
  } catch (error) { console.error('Request completion error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const confirmCompletion = async (req, res) => {
  try {
    const now = new Date();
    const booking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, customer: req.user.id, status: 'completion-pending' }, { $set: { status: 'completed', customerConfirmedAt: now, completedAt: now } }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found or is not waiting for confirmation' });
    if (booking.worker) await Worker.updateOne({ _id: booking.worker }, { $set: { isAvailable: true } });
    return res.status(200).json({ message: 'Work confirmed successfully', booking });
  } catch (error) { console.error('Confirm completion error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const disputeCompletion = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, customer: req.user.id, status: 'completion-pending' }, { $set: { status: 'disputed', disputedAt: new Date() } }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found or is not waiting for confirmation' });
    if (booking.worker) await Worker.updateOne({ _id: booking.worker }, { $set: { isAvailable: true } });
    return res.status(200).json({ message: 'Completion disputed. Payment remains locked.', booking });
  } catch (error) { console.error('Dispute completion error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, customer: req.user.id, status: { $in: ['requested', 'accepted'] } }, { $set: { status: 'cancelled' } }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found or cannot be cancelled' });
    if (booking.worker) await Worker.updateOne({ _id: booking.worker }, { $set: { isAvailable: true } });
    return res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) { console.error('Cancel booking error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const getMyBookings = async (req, res) => {
  try {
    await expireTimedOutBookings();
    const bookings = await Booking.find({ customer: req.user.id }).populate('worker', 'name phone skills rating isAvailable verification').sort({ createdAt: -1 }).limit(200);
    return res.status(200).json({ count: bookings.length, bookings });
  } catch (error) { console.error('Get my bookings error:', error); return res.status(500).json({ message: 'Server error' }); }
};

const rateBooking = async (req, res) => {
  try {
    const numericScore = Number(req.body?.score);
    const review = typeof req.body?.review === 'string' ? req.body.review.trim().slice(0, 300) : '';
    if (!Number.isFinite(numericScore) || numericScore < 1 || numericScore > 5) return res.status(400).json({ message: 'Rating score must be between 1 and 5' });
    const booking = await Booking.findOne({ _id: req.params.bookingId, customer: req.user.id, status: 'completed' });
    if (!booking) return res.status(404).json({ message: 'Completed booking not found' });
    if (booking.rating?.score) return res.status(400).json({ message: 'Booking has already been rated' });
    if (!booking.worker) return res.status(400).json({ message: 'Cannot rate a booking without a worker' });
    const worker = await Worker.findById(booking.worker);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    booking.rating = { score: numericScore, review };
    const oldCount = worker.rating.count || 0;
    const oldAverage = worker.rating.average || 0;
    const newCount = oldCount + 1;
    worker.rating.count = newCount;
    worker.rating.average = Number((((oldAverage * oldCount) + numericScore) / newCount).toFixed(2));
    await booking.save();
    await worker.save();
    return res.status(200).json({ message: 'Rating submitted successfully', rating: booking.rating, workerRating: { average: worker.rating.average, count: worker.rating.count } });
  } catch (error) { console.error('Rate booking error:', error); return res.status(500).json({ message: 'Server error' }); }
};

module.exports = { createBooking, getAvailableBookings, getWorkerBookings, acceptBooking, rejectBooking, startBooking, requestCompletion, confirmCompletion, disputeCompletion, cancelBooking, getMyBookings, rateBooking };
