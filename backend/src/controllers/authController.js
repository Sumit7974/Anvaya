const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer = require('../models/Customer');
const Worker = require('../models/Worker');
const Admin = require('../models/Admin');
const Contractor = require('../models/Contractor');

const roleModels = {
  customer: Customer,
  worker: Worker,
  admin: Admin,
  contractor: Contractor
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = (role) => async (req, res) => {
  try {
    const Model = roleModels[role];
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || (role !== 'admin' && !phone)) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const existing = await Model.findOne(
      role === 'admin' ? { email } : { $or: [{ email }, { phone }] }
    );
    if (existing) {
      return res.status(400).json({ message: 'Email or phone already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await Model.create({ name, email, phone, passwordHash });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role,
      token: generateToken(user._id, role)
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email or phone already registered' });
    }
    res.status(500).json({ message: err.message });
  }
};

const loginUser = (role) => async (req, res) => {
  try {
    const Model = roleModels[role];
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await Model.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role,
      token: generateToken(user._id, role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };