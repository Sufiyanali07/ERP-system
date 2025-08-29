require('dotenv').config();

console.log('🔍 Environment Variables Check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI || 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');

if (!process.env.MONGODB_URI) {
    console.log('\n❌ MONGODB_URI is not set in .env file');
    console.log('📝 Please create/update .env file with:');
    console.log('MONGODB_URI=mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority');
} else if (process.env.MONGODB_URI.includes('localhost')) {
    console.log('\n⚠️  MONGODB_URI is set to localhost - needs to be updated to Atlas');
} else {
    console.log('\n✅ MONGODB_URI looks correct');
}
