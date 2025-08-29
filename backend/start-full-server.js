// Full server startup with proper error handling
console.log('=== Starting ERP Backend Server ===');

// Set environment variables
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/erp_system';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_this_in_production';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_super_secret_refresh_key_here_change_this_in_production';
process.env.PORT = process.env.PORT || '5000';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
process.env.JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || '12';
process.env.MAX_LOGIN_ATTEMPTS = process.env.MAX_LOGIN_ATTEMPTS || '5';
process.env.ACCOUNT_LOCK_TIME = process.env.ACCOUNT_LOCK_TIME || '1800000';

console.log('Environment variables configured');
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('Port:', process.env.PORT);

// Test MongoDB connection first
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    
    // Start the main server
    console.log('Starting Express server...');
    require('./server.js');
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    console.log('Starting server without MongoDB (some features may not work)...');
    
    // Start server anyway for basic functionality
    const express = require('express');
    const cors = require('cors');
    
    const app = express();
    const PORT = process.env.PORT || 5000;
    
    app.use(cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true
    }));
    app.use(express.json());
    
    // Basic routes
    app.get('/', (req, res) => {
      res.json({ 
        message: 'ERP Backend Server is running (MongoDB disconnected)', 
        timestamp: new Date().toISOString(),
        status: 'partial'
      });
    });
    
    app.post('/api/auth/login', (req, res) => {
      res.status(500).json({ 
        success: false, 
        message: 'Database connection required for authentication' 
      });
    });
    
    app.post('/api/auth/signup', (req, res) => {
      res.status(500).json({ 
        success: false, 
        message: 'Database connection required for user registration' 
      });
    });
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT} (Limited functionality)`);
    });
  });
