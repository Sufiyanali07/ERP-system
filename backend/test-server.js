// Simple test to check if server starts correctly
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Test MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/erp_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((error) => console.error('❌ MongoDB Error:', error.message));

// Basic middleware
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend server is running!',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/test`);
});

module.exports = app;
