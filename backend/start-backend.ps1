Write-Host "Starting ERP Backend Server..." -ForegroundColor Green

# Set environment variables
$env:MONGODB_URI = "mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority"
$env:JWT_SECRET = "your_super_secret_jwt_key_here_change_this_in_production"
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:FRONTEND_URL = "http://localhost:3000"

Write-Host "Environment variables set" -ForegroundColor Yellow
Write-Host "Starting server on port $($env:PORT)..." -ForegroundColor Yellow

# Start the server
node working-server.js

Write-Host "Press any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
