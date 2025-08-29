const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas connection string template
const atlasTemplate = `
=== MongoDB Atlas Setup Instructions ===

1. Go to https://www.mongodb.com/atlas
2. Sign up for a free account
3. Create a new cluster (M0 Sandbox - FREE)
4. Create a database user:
   - Username: admin
   - Password: [generate a strong password]
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string and replace in .env:

MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/erp_system?retryWrites=true&w=majority

=== Alternative: Local MongoDB Setup ===

If you prefer local MongoDB:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install and start the MongoDB service
3. Use this connection string in .env:

MONGODB_URI=mongodb://localhost:27017/erp_system
`;

console.log(atlasTemplate);

// Test current .env configuration
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.log('\n❌ MONGODB_URI not found in .env file');
    console.log('📝 Please copy .env.example to .env and configure MongoDB connection');
    process.exit(1);
}

console.log('\n🔍 Testing current MongoDB configuration...');
console.log('URI:', mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials

async function testConnection() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        
        console.log('✅ MongoDB connection successful!');
        console.log('Database:', mongoose.connection.name);
        
        await mongoose.disconnect();
        return true;
    } catch (error) {
        console.log('❌ MongoDB connection failed:', error.message);
        return false;
    }
}

testConnection().then(success => {
    if (success) {
        console.log('\n🚀 Your backend is ready to run!');
        console.log('Run: npm start or node server.js');
    } else {
        console.log('\n💡 Next steps:');
        console.log('1. Set up MongoDB Atlas (recommended) or install local MongoDB');
        console.log('2. Update MONGODB_URI in your .env file');
        console.log('3. Run this script again to test');
    }
    process.exit(success ? 0 : 1);
});
