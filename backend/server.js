const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/students');
const facultyRoutes = require('./routes/faculty');
const classRoutes = require('./routes/classes');
const assignmentRoutes = require('./routes/assignments');
const attendanceRoutes = require('./routes/attendance');
const gradeRoutes = require('./routes/grades');
const messageRoutes = require('./routes/messages');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const server = createServer(app);

// Socket.io setup
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://192.168.1.5:3000",
  "http://localhost:3000",
  "https://erp-system-bthbvl5mp-sufiyan-alis-projects-3e38a188.vercel.app",
  "https://erp-system-rose.vercel.app",
  "https://*.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((error) => console.error('❌ MongoDB connection error:', error));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  // Join user to their personal room for direct messages
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${socket.id} joined personal room: user-${userId}`);
  });

  // Join user to their role-based room
  socket.on('join-role', (role) => {
    socket.join(role);
    console.log(`User ${socket.id} joined ${role} room`);
  });

  // Join user to their specific room (e.g., class, department)
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Handle real-time notifications
  socket.on('send-notification', (data) => {
    socket.to(data.room).emit('notification', data);
  });

  // Handle new messages
  socket.on('send-message', (data) => {
    socket.to(`user-${data.recipientId}`).emit('new-message', data);
  });

  // Handle message read status
  socket.on('message-read', (data) => {
    socket.to(`user-${data.senderId}`).emit('message-read', data);
  });

  // Handle typing indicators
  socket.on('typing-start', (data) => {
    socket.to(`user-${data.recipientId}`).emit('user-typing', {
      userId: data.senderId,
      userName: data.senderName
    });
  });

  socket.on('typing-stop', (data) => {
    socket.to(`user-${data.recipientId}`).emit('user-stopped-typing', {
      userId: data.senderId
    });
  });

  // Handle attendance updates
  socket.on('attendance-update', (data) => {
    io.to('faculty').emit('attendance-updated', data);
    io.to('admin').emit('attendance-updated', data);
  });

  // Handle grade updates
  socket.on('grade-update', (data) => {
    io.to(`student-${data.studentId}`).emit('grade-updated', data);
    io.to('admin').emit('grade-updated', data);
  });

  // Handle assignment submissions
  socket.on('assignment-submitted', (data) => {
    io.to('faculty').emit('new-submission', data);
  });

  socket.on('disconnect', () => {
    console.log('👤 User disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/students', authenticateToken, studentRoutes);
app.use('/api/faculty', authenticateToken, facultyRoutes);
app.use('/api/classes', authenticateToken, classRoutes);
app.use('/api/assignments', authenticateToken, assignmentRoutes);
app.use('/api/attendance', authenticateToken, attendanceRoutes);
app.use('/api/grades', authenticateToken, gradeRoutes);
app.use('/api/messages', messageRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  });
}

module.exports = app;
