// Simplified server for testing
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

console.log('🚀 Starting Simple ERP Server...');
                if (parts.length > 4) {
                    const pid = parts[parts.length - 1];
                    if (pid && pid !== '0') {
                        exec(`taskkill /F /PID ${pid}`, () => {});
                    }
                }
            });
        }
    });
}

// Kill existing processes first
killPort5000();

// Wait a moment then start server
setTimeout(() => {
    // Middleware
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(express.json());

    // Routes
    app.get('/', (req, res) => {
        res.json({ message: 'ERP Backend Server is running!' });
    });

    app.get('/api/health', (req, res) => {
        res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    // Auth routes
    app.post('/api/auth/signup', (req, res) => {
        console.log('Signup request received:', req.body);
        res.json({ 
            success: true, 
            message: 'User created successfully!',
            user: {
                id: Date.now(),
                email: req.body.email,
                role: req.body.role
            }
        });
    });

    app.post('/api/auth/login', (req, res) => {
        console.log('Login request received:', req.body);
        res.json({ 
            success: true, 
            message: 'Login successful!',
            data: {
                token: 'fake-jwt-token',
                refreshToken: 'fake-refresh-token',
                user: {
                    id: Date.now(),
                    email: req.body.email,
                    role: req.body.role || 'student'
                },
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    department: 'Computer Science'
                }
            }
        });
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🔗 Frontend: http://localhost:3000`);
        console.log(`💚 Health: http://localhost:${PORT}/api/health`);
        console.log('✅ Ready for requests!');
    });
}, 3000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n✓ Server shutting down gracefully...');
  process.exit(0);
});
