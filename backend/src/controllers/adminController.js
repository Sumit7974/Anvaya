const Worker = require('../models/Worker');


// Get all workers waiting for verification
const getPendingWorkers = async (req, res) => {
  try {
    const workers = await Worker.find({
      'verification.status': 'pending'
    })
      .select('-passwordHash')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: workers.length,
      workers
    });

  } catch (error) {
    console.error('Get pending workers error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Verify or reject a worker
const verifyWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { status } = req.body;

    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Status must be either verified or rejected'
      });
    }

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        message: 'Worker not found'
      });
    }

    worker.verification.status = status;

    if (status === 'verified') {
      worker.verification.verifiedBy = req.user.id;
      worker.verification.verifiedAt = new Date();
    } else {
      worker.verification.verifiedBy = undefined;
      worker.verification.verifiedAt = undefined;
    }

    await worker.save();

    res.status(200).json({
      message: `Worker ${status} successfully`,
      worker: {
        _id: worker._id,
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        skills: worker.skills,
        verification: worker.verification,
        isActive: worker.isActive
      }
    });

  } catch (error) {
    console.error('Verify worker error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Suspend or reactivate a worker
const updateWorkerStatus = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        message: 'isActive must be a boolean'
      });
    }

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        message: 'Worker not found'
      });
    }

    worker.isActive = isActive;

    // Suspended workers cannot remain available for new jobs
    if (!isActive) {
      worker.isAvailable = false;
    }

    await worker.save();

    res.status(200).json({
      message: isActive
        ? 'Worker reactivated successfully'
        : 'Worker suspended successfully',
      worker: {
        _id: worker._id,
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        isActive: worker.isActive,
        isAvailable: worker.isAvailable,
        verification: worker.verification
      }
    });

  } catch (error) {
    console.error('Update worker status error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


module.exports = {
  getPendingWorkers,
  verifyWorker,
  updateWorkerStatus
};
