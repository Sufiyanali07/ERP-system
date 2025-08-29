const mongoose = require('mongoose');

// Direct connection test with your Atlas URI
const mongoUri = 'mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority';

console.log('🔍 Testing MongoDB Atlas connection...');

mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
})
.then(() => {
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('Database:', mongoose.connection.name);
    mongoose.disconnect();
    process.exit(0);
})
.catch(err => {
    console.log('❌ MongoDB connection failed:', err.message);
    process.exit(1);
});
