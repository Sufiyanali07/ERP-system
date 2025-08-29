// Debug script to test server startup
console.log('=== ERP Backend Debug Script ===');
console.log('Node.js version:', process.version);
console.log('Current directory:', process.cwd());

// Test environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET', 
  'JWT_REFRESH_SECRET',
  'PORT'
];

console.log('\n=== Environment Variables ===');
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  console.log(`${envVar}: ${value ? '✓ Set' : '✗ Missing'}`);
});

// Set default environment variables if missing
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/erp_system';
  console.log('Set default MONGODB_URI');
}

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your_super_secret_jwt_key_here_change_this_in_production';
  console.log('Set default JWT_SECRET');
}

if (!process.env.JWT_REFRESH_SECRET) {
  process.env.JWT_REFRESH_SECRET = 'your_super_secret_refresh_key_here_change_this_in_production';
  console.log('Set default JWT_REFRESH_SECRET');
}

if (!process.env.PORT) {
  process.env.PORT = '5000';
  console.log('Set default PORT');
}

console.log('\n=== Testing MongoDB Connection ===');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    
    console.log('\n=== Starting Express Server ===');
    const express = require('express');
    const cors = require('cors');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    require('dotenv').config();

    const app = express();
    const PORT = 5000;
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    // Middleware
    app.use(cors({
        origin: ['http://localhost:3000', 'http://192.168.1.3:3000'],
        credentials: true
    }));
    app.use(express.json());

    console.log('🚀 Starting ERP Authentication Server...');

    // User Schema
    const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, minlength: 6 },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, enum: ['student', 'faculty', 'admin'], required: true },
        isActive: { type: Boolean, default: true }
    }, { timestamps: true });

    // Hash password before saving
    userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) return next();
        try {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    });

    // Compare password method
    userSchema.methods.comparePassword = async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    };

    const User = mongoose.model('User', userSchema);

    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority')
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    });

    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
        });
    });

    // Signup endpoint
    app.post('/api/auth/signup', async (req, res) => {
        try {
            console.log('📝 Signup request received:', req.body);
            
            const { email, password, firstName, lastName, role } = req.body;

            // Validate required fields
            if (!email || !password || !firstName || !lastName) {
                console.log('❌ Missing required fields');
                return res.status(400).json({ 
                    success: false, 
                    message: 'All fields are required' 
                });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.log('❌ User already exists:', email);
                return res.status(400).json({ 
                    success: false, 
                    message: 'User already exists with this email' 
                });
            }

            // Create new user
            const user = new User({
                email,
                password,
                firstName,
                lastName,
                role: role || 'student'
            });

            await user.save();
            console.log('✅ User created successfully:', email);

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            });

        } catch (error) {
            console.error('❌ Signup error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error: ' + error.message 
            });
        }
    });

    // Login endpoint
    app.post('/api/auth/login', async (req, res) => {
        try {
            console.log('🔐 Login request received:', { email: req.body.email });
            
            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                console.log('❌ Missing email or password');
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                console.log('❌ User not found:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            console.log('👤 User found:', email, 'Role:', user.role);

            // Check password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                console.log('❌ Invalid password for:', email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            console.log('✅ Password valid for:', email);

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            console.log('✅ Login successful for:', email);

            res.json({
                success: true,
                message: 'Login successful!',
                data: {
                    token,
                    refreshToken: 'refresh-token-placeholder',
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    },
                    profile: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        department: 'Computer Science'
                    }
                }
            });

        } catch (error) {
            console.error('❌ Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error: ' + error.message
            });
        }
    });

    // Get all users (for testing)
    app.get('/api/users', async (req, res) => {
        try {
            const users = await User.find({}, '-password');
            res.json({
                success: true,
                count: users.length,
                users: users
            });
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🔗 Frontend: http://localhost:3000`);
        console.log(`💚 Health: http://localhost:${PORT}/api/health`);
        console.log(`👥 Users: http://localhost:${PORT}/api/users`);
        console.log('✅ Debug server ready!');
    });

    // Handle process termination
    process.on('SIGINT', () => {
        console.log('\n✓ Server shutting down gracefully...');
        mongoose.connection.close();
        process.exit(0);
    });
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    console.log('\nTrying to start server without MongoDB...');
    
    // Try to start server anyway to see other errors
    try {
      require('./server.js');
    } catch (serverErr) {
      console.error('✗ Server startup failed:', serverErr.message);
      console.error('Full error:', serverErr);
    }
  });
