const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const User = require('./models/User');
const Endpoint = require('./models/Endpoint');
const Log = require('./models/Log');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'epandcloud_super_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// MongoDB Connection & Admin Seed
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/epandcloud')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Auto-seed admin if not exists
    const adminExists = await User.findOne({ username: 'epandcloudnesia' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('epandcloudpunyaepand', 10);
      await User.create({
        username: 'epandcloudnesia',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin seeded successfully');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Auth Middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') throw new Error();
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- ROUTES ---

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all endpoints (Admin)
app.get('/api/endpoints', authenticateAdmin, async (req, res) => {
  const endpoints = await Endpoint.find().sort({ createdAt: -1 });
  res.json(endpoints);
});

// Create endpoint (Admin)
app.post('/api/endpoints', authenticateAdmin, async (req, res) => {
  try {
    const { name, path, method, response } = req.body;
    const newEndpoint = new Endpoint({ name, path, method, response });
    await newEndpoint.save();
    res.status(201).json(newEndpoint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Dynamic API Handler & Logging
app.all('/api/dynamic/*', async (req, res) => {
  const path = req.path.replace('/dynamic', '');
  const method = req.method;
  
  const endpoint = await Endpoint.findOne({ path, method });
  
  let status = 404;
  let responseData = { message: 'Endpoint not found' };

  if (endpoint) {
    status = 200;
    try {
      responseData = JSON.parse(endpoint.response);
    } catch (e) {
      status = 500;
      responseData = { message: 'Invalid JSON response configured' };
    }
  }

  // Log the request
  await Log.create({
    endpoint: path,
    method,
    status,
    timestamp: new Date()
  });

  res.status(status).json(responseData);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
