const Worker = require('../models/Worker');

const safeWorkerFields = '-passwordHash -phone';
const normalizeSkills = skills => Array.isArray(skills)
  ? [...new Set(skills.map(skill => String(skill).trim().toLowerCase()).filter(Boolean))].slice(0, 20)
  : [];

const normalizePoint = location => {
  if (!location || location.type !== 'Point' || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) return null;
  const [longitude, latitude] = location.coordinates.map(Number);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) return null;
  return { type: 'Point', coordinates: [longitude, latitude] };
};

const updateProfile = async (req, res) => {
  try {
    const { skills, location } = req.body || {};
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    if (skills !== undefined) {
      const normalizedSkills = normalizeSkills(skills);
      if (!normalizedSkills.length) return res.status(400).json({ message: 'Add at least one valid skill' });
      worker.skills = normalizedSkills;
    }

    if (location !== undefined) {
      const point = normalizePoint(location);
      if (!point) return res.status(400).json({ message: 'Location must be a valid GeoJSON point' });
      worker.location = point;
    }

    await worker.save();
    const safeWorker = worker.toObject();
    delete safeWorker.passwordHash;
    delete safeWorker.phone;
    return res.status(200).json({ message: 'Profile updated successfully', worker: safeWorker });
  } catch (error) {
    console.error('Update worker profile error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id).select('-passwordHash');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    return res.status(200).json({ worker });
  } catch (error) {
    console.error('Get worker profile error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    if (!worker.isActive || worker.verification.status !== 'verified') return res.status(403).json({ message: 'Only an active, verified worker can change availability' });
    worker.isAvailable = !worker.isAvailable;
    await worker.save();
    return res.status(200).json({ message: `You are now ${worker.isAvailable ? 'available' : 'unavailable'} for jobs`, isAvailable: worker.isAvailable });
  } catch (error) {
    console.error('Toggle availability error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAllWorkers = async (req, res) => {
  try {
    const { skill, isAvailable } = req.query;
    const filter = { isActive: true, 'verification.status': 'verified' };
    if (skill) filter.skills = String(skill).trim().toLowerCase();
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    const workers = await Worker.find(filter).select(safeWorkerFields).sort({ createdAt: -1 }).limit(500);
    return res.status(200).json({ count: workers.length, workers });
  } catch (error) {
    console.error('Get all workers error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getNearbyWorkers = async (req, res) => {
  try {
    const { skill, longitude, latitude, radius = 10 } = req.query;
    if (longitude === undefined || latitude === undefined) return res.status(400).json({ message: 'Longitude and latitude are required' });

    const lng = Number(longitude);
    const lat = Number(latitude);
    const radiusKm = Number(radius);
    if (!Number.isFinite(lng) || !Number.isFinite(lat) || !Number.isFinite(radiusKm) || radiusKm <= 0 || radiusKm > 50 || lng < -180 || lng > 180 || lat < -90 || lat > 90) {
      return res.status(400).json({ message: 'Invalid location or radius' });
    }

    const filter = {
      isActive: true,
      isAvailable: true,
      'verification.status': 'verified',
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000
        }
      }
    };
    if (skill) filter.skills = String(skill).trim().toLowerCase();

    const workers = await Worker.find(filter).select(safeWorkerFields).limit(100);
    return res.status(200).json({ count: workers.length, radiusKm, workers });
  } catch (error) {
    console.error('Get nearby workers error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const uploadVerificationDoc = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No valid document uploaded' });
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    const filePath = `/uploads/verification/${req.file.filename}`;
    worker.verification.documents = Array.isArray(worker.verification.documents) ? worker.verification.documents : [];
    worker.verification.documents.push(filePath);
    worker.verification.status = 'pending';
    worker.isAvailable = false;
    await worker.save();

    return res.status(200).json({ message: 'Document uploaded, pending admin verification', document: filePath, verification: worker.verification });
  } catch (error) {
    console.error('Upload verification doc error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const matchService = async (req, res) => {
  try {
    const { problem } = req.body || {};
    if (!problem || typeof problem !== 'string' || !problem.trim()) return res.status(400).json({ message: 'Problem description is required' });
    const text = problem.toLowerCase().slice(0, 2000);
    const serviceKeywords = {
      plumber: ['tap', 'pipe', 'water', 'leak', 'leaking', 'faucet', 'drain', 'toilet', 'plumbing'],
      electrician: ['switch', 'wire', 'wiring', 'electric', 'electricity', 'fan', 'light', 'socket', 'voltage', 'spark', 'fridge', 'refrigerator'],
      painter: ['paint', 'painting', 'wall', 'colour', 'color', 'whitewash'],
      carpenter: ['door', 'furniture', 'wood', 'table', 'chair', 'cabinet', 'carpenter'],
      mason: ['brick', 'cement', 'concrete', 'wall crack', 'masonry', 'construction']
    };

    for (const [service, keywords] of Object.entries(serviceKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) return res.status(200).json({ matched: true, serviceTag: service });
    }
    return res.status(200).json({ matched: false, serviceTag: null, message: 'Could not determine the required service' });
  } catch (error) {
    console.error('Match service error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateProfile, getProfile, toggleAvailability, getAllWorkers, getNearbyWorkers, uploadVerificationDoc, matchService };
