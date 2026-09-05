const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

// A worker remains unavailable while any accepted/requested job still holds
// their capacity. This prevents releasing them because one unrelated booking
// was cancelled or timed out.
const HOLDING_STATUSES = ['requested', 'accepted', 'quote-pending', 'in-progress', 'completion-pending'];

const releaseWorkerIfIdle = async workerId => {
  if (!workerId) return;
  const activeBooking = await Booking.exists({
    worker: workerId,
    status: { $in: HOLDING_STATUSES }
  });
  if (!activeBooking) {
    await Worker.updateOne({ _id: workerId }, { $set: { isAvailable: true } });
  }
};

module.exports = { releaseWorkerIfIdle };
