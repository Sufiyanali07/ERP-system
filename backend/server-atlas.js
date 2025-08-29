// ERP Backend Server with MongoDB Atlas
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Set environment variables with defaults
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://erpuser:erppassword123@cluster0.mongodb.net/erp_system?retryWrites=true&w=majority';
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

console.log('=== ERP Backend Server Starting ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);
console.log('Frontend URL:', process.env.FRONTEND_URL);

const app = express();
const server = createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ERP Backend Server is running!', 
    timestamp: new Date().toISOString(),
    status: 'healthy',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Import and use routes (with error handling)
try {
  const authRoutes = require('./routes/auth');
  const messageRoutes = require('./routes/messages');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/messages', messageRoutes);
  
  console.log('✓ Routes loaded successfully');
} catch (error) {
  console.warn('⚠ Some routes failed to load:', error.message);
  
  // Fallback routes for testing
  app.post('/api/auth/login', (req, res) => {
    console.log('Login attempt:', req.body);
    res.status(500).json({ 
      success: false, 
      message: 'Authentication service temporarily unavailable' 
    });
  });
  
  app.post('/api/auth/signup', (req, res) => {
    console.log('Signup attempt:', req.body);
    res.status(500).json({ 
      success: false, 
      message: 'Registration service temporarily unavailable' 
    });
  });
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_room', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });
  
  socket.on('send_message', (messageData) => {
    io.to(`user_${messageData.recipient}`).emit('new_message', messageData);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// MongoDB connection
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✓ MongoDB connected successfully');
  
  // Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log('✓ Socket.io enabled');
    console.log('✓ CORS configured for:', process.env.FRONTEND_URL);
    console.log('\nAvailable endpoints:');
    console.log('  GET  / - Server health check');
    console.log('  POST /api/auth/login - User login');
    console.log('  POST /api/auth/signup - User registration');
    console.log('  POST /api/messages - Send message');
    console.log('  GET  /api/messages - Get messages');
  });
})
.catch(err => {
  console.error('✗ MongoDB connection failed:', err.message);
  console.log('Starting server without database...');
  
  // Start server anyway for basic functionality
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`⚠ Server running on http://localhost:${PORT} (Database disconnected)`);
    console.log('Some features may not work without database connection');
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✓ Shutting down server gracefully...');
  mongoose.connection.close();
  server.close(() => {
    console.log('✓ Server closed');
    process.exit(0);
  });
});

module.exports = { app, server, io };
