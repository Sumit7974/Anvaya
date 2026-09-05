const mongoose = require('mongoose');

const validateObjectId = parameter => (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params[parameter])) {
    return res.status(400).json({ message: `Invalid ${parameter}` });
  }
  return next();
};

module.exports = validateObjectId;
