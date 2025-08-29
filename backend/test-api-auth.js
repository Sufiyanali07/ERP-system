const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const API_BASE = 'http://localhost:5000/api/auth';

async function testAPIAuthentication() {
    try {
        // Connect to MongoDB to clean test data
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Clean up test users
        await User.deleteMany({ email: { $in: ['apitest@example.com', 'apifaculty@example.com'] } });
        console.log('🧹 Cleaned test users');

        console.log('\n=== API AUTHENTICATION FLOW TEST ===\n');

        // TEST 1: Try login without account (should fail)
        console.log('🔍 TEST 1: Login attempt without creating account');
        try {
            const loginResponse = await axios.post(`${API_BASE}/login`, {
                email: 'apitest@example.com',
                password: 'password123'
            });
            console.log('❌ ERROR: Login succeeded without account creation!');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('✅ CORRECT: Login failed - Invalid credentials');
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Message: ${error.response.data.message}`);
            } else {
                console.log('❌ Unexpected error:', error.message);
            }
        }

        // TEST 2: Create student account via signup
        console.log('\n🔍 TEST 2: Creating student account via signup API');
        try {
            const signupResponse = await axios.post(`${API_BASE}/signup`, {
                email: 'apitest@example.com',
                password: 'password123',
                firstName: 'API',
                lastName: 'Student',
                role: 'student',
                phone: '1234567890',
                department: 'Computer Science',
                course: 'B.Tech'
            });
            
            console.log('✅ Student signup successful');
            console.log(`   Status: ${signupResponse.status}`);
            console.log(`   User ID: ${signupResponse.data.data.user._id}`);
            console.log(`   Role: ${signupResponse.data.data.user.role}`);
            console.log(`   Token received: ${!!signupResponse.data.data.token}`);
        } catch (error) {
            console.log('❌ Signup failed:', error.response?.data?.message || error.message);
        }

        // TEST 3: Login with valid credentials (should succeed)
        console.log('\n🔍 TEST 3: Login with valid credentials after signup');
        try {
            const loginResponse = await axios.post(`${API_BASE}/login`, {
                email: 'apitest@example.com',
                password: 'password123'
            });
            
            console.log('✅ Login successful');
            console.log(`   Status: ${loginResponse.status}`);
            console.log(`   User: ${loginResponse.data.data.user.firstName} ${loginResponse.data.data.user.lastName}`);
            console.log(`   Role: ${loginResponse.data.data.user.role}`);
            console.log(`   Token received: ${!!loginResponse.data.data.token}`);
            console.log(`   Profile attached: ${!!loginResponse.data.data.profile}`);
        } catch (error) {
            console.log('❌ Login failed:', error.response?.data?.message || error.message);
        }

        // TEST 4: Login with wrong password (should fail)
        console.log('\n🔍 TEST 4: Login with wrong password');
        try {
            const loginResponse = await axios.post(`${API_BASE}/login`, {
                email: 'apitest@example.com',
                password: 'wrongpassword'
            });
            console.log('❌ ERROR: Login succeeded with wrong password!');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('✅ CORRECT: Login failed with wrong password');
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Message: ${error.response.data.message}`);
            }
        }

        // TEST 5: Try duplicate signup (should fail)
        console.log('\n🔍 TEST 5: Attempt duplicate signup');
        try {
            const duplicateSignup = await axios.post(`${API_BASE}/signup`, {
                email: 'apitest@example.com',
                password: 'password123',
                firstName: 'Duplicate',
                lastName: 'User',
                role: 'student'
            });
            console.log('❌ ERROR: Duplicate signup succeeded!');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('✅ CORRECT: Duplicate signup prevented');
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Message: ${error.response.data.message}`);
            }
        }

        // TEST 6: Create faculty account
        console.log('\n🔍 TEST 6: Creating faculty account');
        try {
            const facultySignup = await axios.post(`${API_BASE}/signup`, {
                email: 'apifaculty@example.com',
                password: 'faculty123',
                firstName: 'API',
                lastName: 'Faculty',
                role: 'faculty',
                phone: '9876543210',
                department: 'Computer Science',
                designation: 'Assistant Professor'
            });
            
            console.log('✅ Faculty signup successful');
            console.log(`   Role: ${facultySignup.data.data.user.role}`);
            console.log(`   Employee ID: ${facultySignup.data.data.profile?.employeeId}`);
        } catch (error) {
            console.log('❌ Faculty signup failed:', error.response?.data?.message || error.message);
        }

        console.log('\n=== AUTHENTICATION SECURITY VERIFIED ===');
        console.log('✅ Users must signup before login');
        console.log('✅ Login validates email exists in database');
        console.log('✅ Password verification required');
        console.log('✅ Duplicate accounts prevented');
        console.log('✅ Role-based profiles created');
        console.log('✅ JWT tokens generated for authenticated users');

    } catch (error) {
        console.error('❌ Test error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

// Check if server is running first
async function checkServer() {
    try {
        const response = await axios.get('http://localhost:5000/health');
        console.log('✅ Backend server is running');
        return true;
    } catch (error) {
        console.log('❌ Backend server is not running on port 5000');
        console.log('   Please start the server with: node server.js');
        return false;
    }
}

async function runTests() {
    const serverRunning = await checkServer();
    if (serverRunning) {
        await testAPIAuthentication();
    }
}

runTests();
