// Minimal working server for ERP backend
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Basic middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

console.log('Starting minimal ERP server...');

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'ERP Backend Server is running!', 
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Mock authentication endpoints
app.post('/api/auth/signup', (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  
  console.log('Signup request:', { email, firstName, lastName, role });
  
  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  // Mock successful signup
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        role
      }
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login request:', { email });
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  // Mock successful login
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      user: {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        role: 'Faculty'
      }
    }
  });
});

// Mock messaging endpoints
app.get('/api/messages', (req, res) => {
  res.json({
    success: true,
    data: {
      messages: [],
      total: 0
    }
  });
});

app.get('/api/messages/users/contacts', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Student'
      },
      {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Faculty'
      }
    ]
  });
});

app.get('/api/messages/stats/overview', (req, res) => {
  res.json({
    success: true,
    data: {
      unread: 0,
      received: 0,
      sent: 0,
      starred: 0
    }
  });
});

app.post('/api/messages', (req, res) => {
  console.log('Message send request:', req.body);
  res.json({
    success: true,
    message: 'Message sent successfully'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log('✓ CORS enabled for http://localhost:3000');
  console.log('✓ Authentication endpoints available');
  console.log('✓ Messaging endpoints available');
  console.log('\nPress Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✓ Server shutting down...');
  process.exit(0);
});
