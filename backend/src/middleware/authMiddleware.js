const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized, no token' });

  const token = header.slice(7).trim();
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) return res.status(500).json({ message: 'Authentication is not configured securely' });
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    if (!decoded?.id || !decoded?.role) return res.status(401).json({ message: 'Not authorized, invalid token' });
    req.user = { id: decoded.id, role: decoded.role };
    return next();
  } catch {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: 'Access denied for this role' });
  return next();
};

module.exports = { protect, authorize };
