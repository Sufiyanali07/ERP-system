# ERP Backend Server - Quick Start Guide

## 🚀 How to Start the Backend Server

### Method 1: Minimal Server (Recommended for Testing)
1. Open **Command Prompt** or **PowerShell**
2. Run these commands:
```cmd
cd c:\Users\hp\Desktop\Next_ERP\backend
node minimal-server.js
```

### Method 2: Full Server with Database
```cmd
cd c:\Users\hp\Desktop\Next_ERP\backend
node server-atlas.js
```

### Method 3: Using Batch File
```cmd
cd c:\Users\hp\Desktop\Next_ERP\backend
start-server.bat
```

## ✅ Success Indicators
When the server starts correctly, you'll see:
```
✓ Server running on http://localhost:5000
✓ CORS enabled for http://localhost:3000
✓ Authentication endpoints available
✓ Messaging endpoints available
```

## 🔧 Available Endpoints
- `GET /` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message
- `GET /api/messages/users/contacts` - Get contacts
- `GET /api/messages/stats/overview` - Message statistics

## 🐛 Troubleshooting
- If port 5000 is busy: `netstat -ano | findstr :5000`
- Kill existing process: `taskkill /F /PID <process_id>`
- Check if Node.js is installed: `node --version`

## 📝 Next Steps
1. Start the backend server using one of the methods above
2. Keep the terminal window open
3. Test the frontend login/signup functionality
4. Check browser console for any remaining errors

The server must be running for the frontend authentication and messaging to work!
