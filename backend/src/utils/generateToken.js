const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET is not configured securely');
  }
  return jwt.sign({ id: id.toString(), role }, secret, { expiresIn: '7d' });
};

module.exports = generateToken;
