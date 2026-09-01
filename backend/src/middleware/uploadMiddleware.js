const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const uploadDir = path.join(__dirname, '../../uploads/verification');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${req.user.id}-${Date.now()}-${crypto.randomBytes(6).toString('hex')}${extension}`;
    cb(null, uniqueName);
  }
});

const allowedTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png'
]);

const allowedExtensions = new Set(['.pdf', '.jpg', '.jpeg', '.png']);

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.has(file.mimetype) && allowedExtensions.has(extension)) return cb(null, true);
  return cb(new Error('Only PDF, JPG, JPEG and PNG documents are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 10
  }
});

module.exports = upload;
