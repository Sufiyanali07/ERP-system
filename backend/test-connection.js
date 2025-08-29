const mongoose = require('mongoose');

// Your MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority';

console.log('🔍 Testing MongoDB Atlas connection...');

async function testConnection() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        
        console.log('✅ MongoDB Atlas connected successfully!');
        console.log('Database:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        console.log('Ready state:', mongoose.connection.readyState);
        
        await mongoose.disconnect();
        console.log('✅ Disconnected successfully');
        console.log('\n🚀 Your MongoDB connection is working! You can now start your backend server.');
        return true;
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.log('\n💡 Troubleshooting:');
        console.log('1. Check your internet connection');
        console.log('2. Verify the username and password are correct');
        console.log('3. Ensure IP address is whitelisted in MongoDB Atlas');
        return false;
    }
}

testConnection().then(success => {
    process.exit(success ? 0 : 1);
});
