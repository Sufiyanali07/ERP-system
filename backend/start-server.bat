@echo off
echo Starting ERP Backend Server...

set MONGODB_URI=mongodb://localhost:27017/erp_system
set JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
set JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_change_this_in_production
set PORT=5000
set NODE_ENV=development
set FRONTEND_URL=http://localhost:3000
set JWT_EXPIRES_IN=1h
set JWT_REFRESH_EXPIRES_IN=7d
set RATE_LIMIT_WINDOW_MS=900000
set RATE_LIMIT_MAX_REQUESTS=100
set BCRYPT_SALT_ROUNDS=12
set MAX_LOGIN_ATTEMPTS=5
set ACCOUNT_LOCK_TIME=1800000

echo Environment variables set
echo Starting server on port %PORT%...

node working-server.js

pause
