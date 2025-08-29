const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Student Schema (matching working-server.js)
const studentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'student' },
    isActive: { type: Boolean, default: true },
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

// Faculty Schema (matching working-server.js)
const facultySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'faculty' },
    isActive: { type: Boolean, default: true },
    employeeId: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
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

const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);

async function createTestUsers() {
    try {
        // Connect to MongoDB (same as working-server.js)
        await mongoose.connect('mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority');
        console.log('✅ Connected to MongoDB');

        // Clear existing users
        await Student.deleteMany({});
        await Faculty.deleteMany({});
        console.log('🧹 Cleared existing users');

        // Create Test Student
        const testStudent = new Student({
            email: 'student@college.edu',
            password: 'student123',
            firstName: 'John',
            lastName: 'Doe',
            role: 'student',
            studentId: 'STU000001',
            rollNumber: '20240001',
            department: 'Computer Science',
            course: 'B.Tech Computer Science',
            semester: 1,
            academicYear: '2024-2025',
            totalFees: 50000,
            paidFees: 25000
        });
        await testStudent.save();
        console.log('✅ Created Student: student@college.edu / student123');

        // Create Test Faculty
        const testFaculty = new Faculty({
            email: 'faculty@college.edu',
            password: 'faculty123',
            firstName: 'Dr. Sarah',
            lastName: 'Smith',
            role: 'faculty',
            employeeId: 'FAC000001',
            designation: 'Assistant Professor',
            department: 'Computer Science',
            joiningDate: new Date(),
            qualification: 'PhD in Computer Science',
            specialization: ['Programming', 'Data Structures'],
            experience: 5,
            salary: 75000,
            subjects: ['Programming', 'Data Structures', 'Algorithms'],
            officeLocation: 'Room 101'
        });
        await testFaculty.save();
        console.log('✅ Created Faculty: faculty@college.edu / faculty123');

        console.log('\n🎉 Test users created successfully!');
        console.log('\n📋 Login Credentials:');
        console.log('🎓 Student: student@college.edu / student123');
        console.log('👨‍🏫 Faculty: faculty@college.edu / faculty123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating test users:', error);
        process.exit(1);
    }
}

createTestUsers();
