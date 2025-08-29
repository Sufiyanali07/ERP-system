const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = `# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_change_this_in_production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_SALT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
ACCOUNT_LOCK_TIME=1800000

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@erpsystem.com
`;

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully');
    console.log('📁 Location:', envPath);
    
    // Test the environment variables
    require('dotenv').config();
    console.log('\n🔍 Testing environment variables:');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set correctly' : 'Not loaded');
    console.log('PORT:', process.env.PORT);
    
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    console.log('\n📝 Please manually create .env file with this content:');
    console.log(envContent);
}
