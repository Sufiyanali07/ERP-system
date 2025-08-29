const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testing MongoDB Connection...');
console.log('Environment variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');

// Test different connection strings
const connectionStrings = [
    process.env.MONGODB_URI,
    'mongodb://localhost:27017/erp_system',
    'mongodb://127.0.0.1:27017/erp_system'
].filter(Boolean);

async function testConnections() {
    for (let i = 0; i < connectionStrings.length; i++) {
        const uri = connectionStrings[i];
        console.log(`\n📡 Testing connection ${i + 1}: ${uri}`);
        
        try {
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000, // 5 second timeout
                connectTimeoutMS: 5000
            });
            
            console.log('✅ MongoDB Connected successfully!');
            console.log('Database name:', mongoose.connection.name);
            console.log('Ready state:', mongoose.connection.readyState);
            
            await mongoose.disconnect();
            console.log('✅ Disconnected successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Connection failed:', error.message);
            if (error.code) {
                console.error('Error code:', error.code);
            }
        }
    }
    return false;
}

testConnections().then((success) => {
    if (!success) {
        console.log('\n💡 Troubleshooting suggestions:');
        console.log('1. Make sure MongoDB is installed and running');
        console.log('2. Check if MongoDB service is started');
        console.log('3. Verify the MONGODB_URI in .env file');
        console.log('4. Try running: mongod --dbpath ./data/db');
    }
    process.exit(success ? 0 : 1);
});
