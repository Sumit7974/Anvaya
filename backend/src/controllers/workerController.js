const Worker = require('../models/Worker');

const updateProfile = async (req, res) => {
  try {
    const { skills, location } = req.body;
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    if (skills) worker.skills = skills;
    if (location) worker.location = location;

    await worker.save();
    res.status(200).json({ message: 'Profile updated successfully', worker });
  } catch (error) {
    console.error('Update worker profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    worker.isAvailable = !worker.isAvailable;
    await worker.save();

    res.status(200).json({
      message: `You are now ${worker.isAvailable ? 'available' : 'unavailable'} for jobs`,
      isAvailable: worker.isAvailable
    });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllWorkers = async (req, res) => {
  try {
    const { skill, isAvailable } = req.query;
    const filter = { isActive: true };
    if (skill) filter.skills = skill;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

    const workers = await Worker.find(filter).select('-passwordHash').sort({ createdAt: -1 });
    res.status(200).json({ count: workers.length, workers });
  } catch (error) {
    console.error('Get all workers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const uploadVerificationDoc = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    const filePath = `/uploads/verification/${req.file.filename}`;
    worker.verification.documents.push(filePath);
    worker.verification.status = 'pending'; // reset so admin re-checks the new doc

    await worker.save();
    res.status(200).json({
      message: 'Document uploaded, pending admin verification',
      document: filePath,
      verification: worker.verification
    });
  } catch (error) {
    console.error('Upload verification doc error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateProfile, toggleAvailability, getAllWorkers, uploadVerificationDoc };