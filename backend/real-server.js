const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Kill existing processes on port 5000
function killPort5000() {
    exec('netstat -ano | findstr :5000', (error, stdout) => {
        if (stdout) {
            const lines = stdout.split('\n');
            lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
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

// User Schema (base user model)
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // References to role-specific profiles
    studentProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    facultyProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    }
}, {
    timestamps: true
});

// Student Schema (separate collection)
const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    academicYear: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'graduated', 'suspended'],
        default: 'active'
    },
    totalFees: {
        type: Number,
        default: 0
    },
    paidFees: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Faculty Schema (separate collection)
const facultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Lab Assistant', 'Head of Department']
    },
    department: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    specialization: [String],
    experience: {
        type: Number,
        min: 0
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on_leave', 'terminated'],
        default: 'active'
    },
    subjects: [String],
    officeLocation: String
}, {
    timestamps: true
});

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
const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);

// Wait a moment then start server
setTimeout(async () => {
    // Middleware
    app.use(cors({
        origin: ['http://localhost:3000', 'http://192.168.1.3:3000'],
        credentials: true
    }));
    app.use(express.json());

    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
    }

    // Routes
    app.get('/', (req, res) => {
        res.json({ message: 'ERP Backend Server with Real Authentication!' });
    });

    app.get('/api/health', (req, res) => {
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
        });
    });

    // Real Signup Route
    app.post('/api/auth/signup', async (req, res) => {
        try {
            const { email, password, firstName, lastName, role, ...additionalData } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
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

            // Create role-specific profile
            let profileId = null;
            
            if (role === 'student') {
                // Generate unique student ID and roll number
                const studentCount = await Student.countDocuments();
                const studentId = `STU${String(studentCount + 1).padStart(6, '0')}`;
                const rollNumber = `${new Date().getFullYear()}${String(studentCount + 1).padStart(4, '0')}`;
                
                const studentProfile = new Student({
                    user: user._id,
                    studentId,
                    rollNumber,
                    department: additionalData.department || 'Computer Science',
                    course: additionalData.course || 'B.Tech',
                    semester: additionalData.semester || 1,
                    academicYear: additionalData.academicYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
                    totalFees: additionalData.totalFees || 50000,
                    paidFees: additionalData.paidFees || 0
                });
                
                await studentProfile.save();
                profileId = studentProfile._id;
                user.studentProfile = profileId;
                
            } else if (role === 'faculty') {
                // Generate unique employee ID
                const facultyCount = await Faculty.countDocuments();
                const employeeId = `FAC${String(facultyCount + 1).padStart(6, '0')}`;
                
                const facultyProfile = new Faculty({
                    user: user._id,
                    employeeId,
                    designation: additionalData.designation || 'Assistant Professor',
                    department: additionalData.department || 'Computer Science',
                    joiningDate: additionalData.joiningDate || new Date(),
                    qualification: additionalData.qualification || 'M.Tech',
                    specialization: additionalData.specialization || ['Programming'],
                    experience: additionalData.experience || 0,
                    salary: additionalData.salary || 60000,
                    subjects: additionalData.subjects || [],
                    officeLocation: additionalData.officeLocation || 'Room 101'
                });
                
                await facultyProfile.save();
                profileId = facultyProfile._id;
                user.facultyProfile = profileId;
            }

            await user.save();

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                success: true,
                message: `${role === 'student' ? 'Student' : 'Faculty'} profile created successfully`,
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    profileId: profileId
                }
            });

        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    });

    // Real Login Route
    app.post('/api/auth/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            console.log('Login request:', { email });

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Check password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET || 'your_secret_key',
                { expiresIn: '1h' }
            );

            console.log('✅ User logged in successfully:', user.email);

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
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    });

    // Get all users (for testing)
    app.get('/api/users', async (req, res) => {
        try {
            const users = await User.find({}, '-password');
            res.json({
                success: true,
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

    // Get all students with their profiles
    app.get('/api/students', async (req, res) => {
        try {
            const students = await Student.find()
                .populate('user', 'firstName lastName email isActive createdAt')
                .sort({ createdAt: -1 });
            
            res.json({
                success: true,
                count: students.length,
                students: students
            });
        } catch (error) {
            console.error('Get students error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    });

    // Get all faculty with their profiles
    app.get('/api/faculty', async (req, res) => {
        try {
            const faculty = await Faculty.find()
                .populate('user', 'firstName lastName email isActive createdAt')
                .sort({ createdAt: -1 });
            
            res.json({
                success: true,
                count: faculty.length,
                faculty: faculty
            });
        } catch (error) {
            console.error('Get faculty error:', error);
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
        console.log(`🎓 Students: http://localhost:${PORT}/api/students`);
        console.log(`👨‍🏫 Faculty: http://localhost:${PORT}/api/faculty`);
        console.log('✅ Ready for REAL authentication with separate collections!');
    });

}, 2000);
