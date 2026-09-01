const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer = require('../models/Customer');
const Worker = require('../models/Worker');
const Admin = require('../models/Admin');
const Contractor = require('../models/Contractor');

const roleModels = { customer: Customer, worker: Worker, admin: Admin, contractor: Contractor };

const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured');
  return jwt.sign({ id: id.toString(), role }, secret, { expiresIn: '7d' });
};

const registerUser = (role) => async (req, res) => {
  try {
    const Model = roleModels[role];
    if (!Model) return res.status(400).json({ message: 'Invalid registration role' });
    const { name, email, phone, password, companyName, location, service, skills } = req.body;
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedPhone = typeof phone === 'string' ? phone.trim() : '';
    if (!normalizedName || !normalizedEmail || !password || (role !== 'admin' && !normalizedPhone)) return res.status(400).json({ message: 'Please fill all required fields' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters long' });

    const existing = role === 'admin' ? await Model.findOne({ email: normalizedEmail }) : await Model.findOne({ $or: [{ email: normalizedEmail }, { phone: normalizedPhone }] });
    if (existing) return res.status(400).json({ message: 'Email or phone already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = { name: normalizedName, email: normalizedEmail, passwordHash };
    if (role !== 'admin') userData.phone = normalizedPhone;

    if (role === 'worker') {
      const workerSkills = Array.isArray(skills) ? skills.map((skill) => String(skill).trim().toLowerCase()).filter(Boolean).slice(0, 12) : [];
      if (!workerSkills.length) return res.status(400).json({ message: 'Please add at least one skill' });
      userData.skills = workerSkills;
      // Never trust verification claims from the browser. Verification must happen server-side.
      userData.verification = { status: 'pending', provider: 'manual' };
    }

    if (role === 'contractor') {
      userData.companyName = typeof companyName === 'string' ? companyName.trim() : '';
      userData.location = typeof location === 'string' ? location.trim() : '';
      userData.primaryService = typeof service === 'string' ? service.trim() : '';
    }

    const user = await Model.create(userData);
    return res.status(201).json({ _id: user._id, name: user.name, email: user.email, role, token: generateToken(user._id, role) });
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 11000) return res.status(400).json({ message: 'Email or phone already registered' });
    return res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = (role) => async (req, res) => {
  try {
    const Model = roleModels[role];
    if (!Model) return res.status(400).json({ message: 'Invalid login role' });
    const { email, password } = req.body;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!normalizedEmail || !password) return res.status(400).json({ message: 'Email and password are required' });
    const user = await Model.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    if (user.isActive === false) return res.status(403).json({ message: 'Your account is inactive or suspended' });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
    return res.status(200).json({ _id: user._id, name: user.name, email: user.email, role, token: generateToken(user._id, role) });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };