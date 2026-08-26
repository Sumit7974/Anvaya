const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Worker = require('../models/Worker');

const register = async (req, res) => {
  try {
   const { name, email, phone, password, role, skills } = req.body;

    if (!name || !email || !phone || !password || !role) {
        if (password.length < 8) {
  return res.status(400).json({
    message: 'Password must be at least 8 characters long'
  });
}
      return res.status(400).json({
        message: 'Name, email, phone, password and role are required'
      });
    }

    if (!['customer', 'worker'].includes(role)) {
      return res.status(400).json({
        message: 'Role must be customer or worker'
      });
    }

    const Model = role === 'customer' ? Customer : Worker;

    const existingUser = await Model.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email or phone already registered'
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

   const userData = {
  name,
  email,
  phone,
  passwordHash
};

if (role === 'worker') {
  userData.skills = skills || [];
}

const user = await Model.create(userData);

    const token = jwt.sign(
      {
        id: user._id,
        role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: 'Email, password and role are required'
      });
    }

    if (!['customer', 'worker'].includes(role)) {
      return res.status(400).json({
        message: 'Role must be customer or worker'
      });
    }

    const Model = role === 'customer' ? Customer : Worker;

    const user = await Model.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role
      }
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
module.exports = {
  register,
  login
};