const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdminUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@erp.com' });
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            return;
        }

        // Create admin user
        const adminUser = new User({
            email: 'admin@erp.com',
            password: 'admin123',
            firstName: 'System',
            lastName: 'Administrator',
            role: 'admin',
            phone: '9999999999',
            isVerified: true
        });

        await adminUser.save();
        console.log('✅ Admin user created successfully');
        console.log('📧 Email: admin@erp.com');
        console.log('🔑 Password: admin123');

        // Create test student
        const studentUser = new User({
            email: 'student@erp.com',
            password: 'student123',
            firstName: 'Test',
            lastName: 'Student',
            role: 'student',
            phone: '8888888888',
            isVerified: true
        });

        await studentUser.save();
        console.log('✅ Test student created');
        console.log('📧 Email: student@erp.com');
        console.log('🔑 Password: student123');

        // Create test faculty
        const facultyUser = new User({
            email: 'faculty@erp.com',
            password: 'faculty123',
            firstName: 'Test',
            lastName: 'Faculty',
            role: 'faculty',
            phone: '7777777777',
            isVerified: true
        });

        await facultyUser.save();
        console.log('✅ Test faculty created');
        console.log('📧 Email: faculty@erp.com');
        console.log('🔑 Password: faculty123');

    } catch (error) {
        console.error('❌ Error creating users:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

createAdminUser();
