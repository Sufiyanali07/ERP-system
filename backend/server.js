const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

console.log('🚀 Starting Working ERP Server...');

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000', 
        'http://192.168.1.5:3000', 
        'http://192.168.1.3:3000',
        'https://erp-system-rose.vercel.app',
        'https://*.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());

// Student Schema (standalone collection with auth fields)
const studentSchema = new mongoose.Schema({
    // Authentication fields
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'student' },
    isActive: { type: Boolean, default: true },
    
    // Student-specific fields
    studentId: { type: String, required: true, unique: true },
    rollNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    academicYear: { type: String, required: true },
    admissionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive', 'graduated', 'suspended'], default: 'active' },
    totalFees: { type: Number, default: 0 },
    paidFees: { type: Number, default: 0 }
}, { timestamps: true });

// Faculty Schema (standalone collection with auth fields)
const facultySchema = new mongoose.Schema({
    // Authentication fields
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'faculty' },
    isActive: { type: Boolean, default: true },
    
    // Faculty-specific fields
    employeeId: { type: String, required: true, unique: true },
    designation: { type: String, required: true, enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Lab Assistant', 'Head of Department', 'associate-professor', 'assistant-professor', 'professor', 'lecturer', 'lab-assistant', 'head-of-department'] },
    department: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    qualification: { type: String, required: true },
    specialization: [String],
    experience: { type: Number, min: 0 },
    salary: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive', 'on_leave', 'terminated'], default: 'active' },
    subjects: [String],
    officeLocation: String
}, { timestamps: true });

// Hash password before saving - Student
studentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Hash password before saving - Faculty
facultySchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method - Student
studentSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Compare password method - Faculty
facultySchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);

// Connect to MongoDB with connection caching for Vercel
let cachedConnection = null;

const connectToDatabase = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority';
    
    try {
        cachedConnection = await mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB');
        return cachedConnection;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        throw error;
    }
};

// Initialize connection
connectToDatabase();

// Health check
app.get('/api/health', async (req, res) => {
    await connectToDatabase();
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
    await connectToDatabase();
    try {
        console.log('📝 Signup request:', req.body);
        
        const { email, password, firstName, lastName, role, ...additionalData } = req.body;

        // Validate required fields
        if (!email || !password || !firstName || !lastName || !role) {
            console.log('❌ Missing required fields');
            return res.status(400).json({ 
                success: false, 
                message: 'All fields including role are required' 
            });
        }

        // Check if email already exists in either collection
        let existingStudent = null;
        let existingFaculty = null;
        
        try {
            existingStudent = await Student.findOne({ email });
            existingFaculty = await Faculty.findOne({ email });
        } catch (err) {
            console.log('⚠️ Error checking existing users:', err.message);
        }
        
        if (existingStudent || existingFaculty) {
            console.log('❌ User already exists:', email);
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists with this email' 
            });
        }

        let newUser = null;
        let userRole = role;
        
        if (role === 'student') {
            // Generate unique student ID and roll number
            const studentCount = await Student.countDocuments();
            const studentId = `STU${String(studentCount + 1).padStart(6, '0')}`;
            const rollNumber = `${new Date().getFullYear()}${String(studentCount + 1).padStart(4, '0')}`;
            
            newUser = new Student({
                email,
                password,
                firstName,
                lastName,
                role: 'student',
                studentId,
                rollNumber,
                department: additionalData.department || 'Computer Science',
                course: additionalData.course || 'B.Tech',
                semester: additionalData.semester || 1,
                academicYear: additionalData.academicYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
                totalFees: additionalData.totalFees || 50000,
                paidFees: additionalData.paidFees || 0
            });
            
            await newUser.save();
            console.log('✅ Student created directly in students collection:', studentId);
            
        } else if (role === 'faculty') {
            // Generate unique employee ID
            const facultyCount = await Faculty.countDocuments();
            const employeeId = `FAC${String(facultyCount + 1).padStart(6, '0')}`;
            
            // Normalize designation to match enum values
            let designation = additionalData.designation || 'Assistant Professor';
            if (designation === 'associate-professor') designation = 'Associate Professor';
            if (designation === 'assistant-professor') designation = 'Assistant Professor';
            if (designation === 'professor') designation = 'Professor';
            if (designation === 'lecturer') designation = 'Lecturer';
            if (designation === 'lab-assistant') designation = 'Lab Assistant';
            if (designation === 'head-of-department') designation = 'Head of Department';
            
            newUser = new Faculty({
                email,
                password,
                firstName,
                lastName,
                role: 'faculty',
                employeeId,
                designation: designation,
                department: additionalData.department || 'Computer Science',
                joiningDate: additionalData.joiningDate || new Date(),
                qualification: additionalData.qualification || 'M.Tech',
                specialization: additionalData.specialization || ['Programming'],
                experience: additionalData.experience || 0,
                salary: additionalData.salary || 60000,
                subjects: additionalData.subjects || [],
                officeLocation: additionalData.officeLocation || 'Room 101'
            });
            
            await newUser.save();
            console.log('✅ Faculty created directly in faculty collection:', employeeId);
        } else {
            return res.status(400).json({
                success: false,
                message: 'Role must be either student or faculty'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: `${role === 'student' ? 'Student' : 'Faculty'} created successfully in ${role}s collection`,
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role
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
    await connectToDatabase();
    try {
        console.log('🔐 Login request for:', req.body.email);
        
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            console.log('❌ Missing email or password');
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Search for user in both Student and Faculty collections
        let user = await Student.findOne({ email });
        let userType = 'student';
        
        if (!user) {
            user = await Faculty.findOne({ email });
            userType = 'faculty';
        }
        
        if (!user) {
            console.log('❌ User not found in any collection:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        console.log('👤 User found in', userType, 'collection:', email);

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log('❌ Invalid password for:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        console.log('✅ Login successful for:', email, 'as', userType);

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

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
                    department: user.department
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

// Get all students (no User collection needed)
app.get('/api/students', async (req, res) => {
    await connectToDatabase();
    try {
        const students = await Student.find({}, '-password').sort({ createdAt: -1 });
        
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

// Get all faculty (no User collection needed)
app.get('/api/faculty', async (req, res) => {
    await connectToDatabase();
    try {
        const faculty = await Faculty.find({}, '-password').sort({ createdAt: -1 });
        
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


// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🔗 Frontend: http://localhost:3000`);
        console.log(`💚 Health: http://localhost:${PORT}/api/health`);
        console.log(`🎓 Students: http://localhost:${PORT}/api/students`);
        console.log(`👨‍🏫 Faculty: http://localhost:${PORT}/api/faculty`);
        console.log('✅ NO USER COLLECTION - Data stored separately in students/faculty only!');
    });
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n✓ Server shutting down gracefully...');
    mongoose.connection.close();
    process.exit(0);
});

module.exports = app;
