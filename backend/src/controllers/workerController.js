const Worker = require('../models/Worker');

const safeWorkerFields = '-passwordHash -phone';

const updateProfile = async (req, res) => {
  try {
    const { skills, location } = req.body;
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    if (Array.isArray(skills)) worker.skills = skills.map(s => String(s).trim()).filter(Boolean).slice(0, 20);
    if (location) worker.location = location;
    await worker.save();
    const safeWorker = worker.toObject();
    delete safeWorker.passwordHash;
    res.status(200).json({ message: 'Profile updated successfully', worker: safeWorker });
  } catch (error) {
    console.error('Update worker profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id).select('-passwordHash');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.status(200).json({ worker });
  } catch (error) {
    console.error('Get worker profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    if (!worker.isActive || worker.verification.status !== 'verified') return res.status(403).json({ message: 'Only an active, verified worker can change availability' });
    worker.isAvailable = !worker.isAvailable;
    await worker.save();
    res.status(200).json({ message: `You are now ${worker.isAvailable ? 'available' : 'unavailable'} for jobs`, isAvailable: worker.isAvailable });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllWorkers = async (req, res) => {
  try {
    const { skill, isAvailable } = req.query;
    const filter = { isActive: true, 'verification.status': 'verified' };
    if (skill) filter.skills = skill;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    const workers = await Worker.find(filter).select(safeWorkerFields).sort({ createdAt: -1 });
    res.status(200).json({ count: workers.length, workers });
  } catch (error) {
    console.error('Get all workers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getNearbyWorkers = async (req, res) => {
  try {
    const { skill, longitude, latitude, radius = 10 } = req.query;
    if (longitude === undefined || latitude === undefined) return res.status(400).json({ message: 'Longitude and latitude are required' });
    const lng = Number(longitude); const lat = Number(latitude); const radiusKm = Number(radius);
    if (!Number.isFinite(lng) || !Number.isFinite(lat) || !Number.isFinite(radiusKm) || radiusKm <= 0 || lng < -180 || lng > 180 || lat < -90 || lat > 90) return res.status(400).json({ message: 'Invalid location or radius' });
    const filter = { isActive: true, isAvailable: true, 'verification.status': 'verified', location: { $near: { $geometry: { type: 'Point', coordinates: [lng, lat] }, $maxDistance: radiusKm * 1000 } } };
    if (skill) filter.skills = skill;
    const workers = await Worker.find(filter).select(safeWorkerFields);
    res.status(200).json({ count: workers.length, radiusKm, workers });
  } catch (error) {
    console.error('Get nearby workers error:', error);
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
    worker.verification.status = 'pending';
    worker.isAvailable = false;
    await worker.save();
    res.status(200).json({ message: 'Document uploaded, pending admin verification', document: filePath, verification: worker.verification });
  } catch (error) {
    console.error('Upload verification doc error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const matchService = async (req, res) => {
  try {
    const { problem } = req.body;
    if (!problem || typeof problem !== 'string' || !problem.trim()) return res.status(400).json({ message: 'Problem description is required' });
    const text = problem.toLowerCase();
    const serviceKeywords = {
      plumber: ['tap','pipe','water','leak','leaking','faucet','drain','toilet','plumbing'],
      electrician: ['switch','wire','wiring','electric','electricity','fan','light','socket','voltage'],
      painter: ['paint','painting','wall','colour','color','whitewash'],
      carpenter: ['door','furniture','wood','table','chair','cabinet','carpenter'],
      mason: ['brick','cement','concrete','wall crack','masonry','construction']
    };
    let serviceTag = null;
    for (const [service, keywords] of Object.entries(serviceKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) { serviceTag = service; break; }
    }
    if (!serviceTag) return res.status(200).json({ matched: false, serviceTag: null, message: 'Could not determine the required service' });
    res.status(200).json({ matched: true, serviceTag });
  } catch (error) {
    console.error('Match service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateProfile, getProfile, toggleAvailability, getAllWorkers, getNearbyWorkers, uploadVerificationDoc, matchService };