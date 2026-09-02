// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const path = require('path');

// const connectDB = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const workerRoutes = require('./routes/workerRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const quoteRoutes = require('./routes/quoteRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');
// const complaintRoutes = require('./routes/complaintRoutes');

// const app = express();

// const allowedOrigins = (process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:5173')
//   .split(',')
//   .map(origin => origin.trim())
//   .filter(Boolean);

// app.disable('x-powered-by');
// app.set('trust proxy', 1);
// app.use(helmet());
// app.use(cors({
//   origin(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
//     return callback(new Error('Origin is not allowed by CORS'));
//   },
//   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: false
// }));
// app.use(express.json({ limit: '1mb' }));
// app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 300,
//   standardHeaders: 'draft-8',
//   legacyHeaders: false,
//   message: { message: 'Too many requests. Please try again shortly.' }
// });
// app.use('/api', apiLimiter);

// app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
//   dotfiles: 'deny',
//   index: false,
//   maxAge: '1h'
// }));

// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'ok', service: 'anvaya-api' });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/workers', workerRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/quotes', quoteRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/complaints', complaintRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/payments', paymentRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.use((err, req, res, _next) => {
//   console.error(err.stack || err);
//   const status = Number.isInteger(err.statusCode) ? err.statusCode : 500;
//   res.status(status).json({
//     message: status >= 500 ? 'Server error' : (err.message || 'Request failed')
//   });
// });

// const PORT = Number(process.env.PORT) || 5000;

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(error => {
//     console.error('Startup failed:', error);
//     process.exit(1);
//   });

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();

const allowedOrigins = [
  'https://anvaya1-psi.vercel.app',
  'http://localhost:5173',
  'http://localhost:5000',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : []),
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [])
].map(origin => origin.trim()).filter(Boolean);

app.disable('x-powered-by');
app.set('trust proxy', 1);

// Configure Helmet to allow cross-origin resource sharing
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again shortly.' }
});
app.use('/api', apiLimiter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  dotfiles: 'deny',
  index: false,
  maxAge: '1h'
}));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'anvaya-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, _next) => {
  console.error(err.stack || err);
  const status = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  res.status(status).json({
    message: status >= 500 ? 'Server error' : (err.message || 'Request failed')
  });
});

const PORT = Number(process.env.PORT) || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Startup failed:', error);
    process.exit(1);
  });