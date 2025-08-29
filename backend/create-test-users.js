const mongoose = require('mongoose');
const User = require('./models/User');
const Student = require('./models/Student');
const Faculty = require('./models/Faculty');
require('dotenv').config();

async function createTestUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/erp_system');
    console.log('✅ Connected to MongoDB');

    // Clear existing users (optional - remove in production)
    await User.deleteMany({});
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    console.log('🧹 Cleared existing users');

    // Create Admin User
    const adminUser = new User({
      email: 'admin@college.edu',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      phone: '1234567890',
      isActive: true
    });
    await adminUser.save();
    console.log('✅ Created Admin User: admin@college.edu / admin123');

    // Create Student User
    const studentUser = new User({
      email: 'student@college.edu',
      password: 'student123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'student',
      phone: '1234567891',
      isActive: true
    });
    await studentUser.save();

    // Create Student Profile
    const studentProfile = new Student({
      user: studentUser._id,
      studentId: 'STU20240001',
      rollNumber: '2024000001',
      academicYear: '2024-2025',
      semester: 1,
      department: 'Computer Science',
      course: 'B.Tech Computer Science',
      section: 'A',
      batch: '2024',
      currentYear: 1,
      guardian: {
        name: 'Jane Doe',
        relation: 'Mother',
        phone: '1234567892'
      }
    });
    await studentProfile.save();
    
    studentUser.studentProfile = studentProfile._id;
    await studentUser.save();
    console.log('✅ Created Student User: student@college.edu / student123');

    // Create Faculty User
    const facultyUser = new User({
      email: 'faculty@college.edu',
      password: 'faculty123',
      firstName: 'Dr. Sarah',
      lastName: 'Smith',
      role: 'faculty',
      phone: '1234567893',
      isActive: true
    });
    await facultyUser.save();

    // Create Faculty Profile
    const facultyProfile = new Faculty({
      user: facultyUser._id,
      employeeId: 'FAC20240001',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      joiningDate: new Date(),
      qualification: 'PhD in Computer Science',
      salary: 75000
    });
    await facultyProfile.save();
    
    facultyUser.facultyProfile = facultyProfile._id;
    await facultyUser.save();
    console.log('✅ Created Faculty User: faculty@college.edu / faculty123');

    console.log('\n🎉 Test users created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('👨‍💼 Admin: admin@college.edu / admin123');
    console.log('🎓 Student: student@college.edu / student123');
    console.log('👨‍🏫 Faculty: faculty@college.edu / faculty123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test users:', error);
    process.exit(1);
  }
}

createTestUsers();
