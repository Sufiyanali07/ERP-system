const { exec } = require('child_process');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'Backend API is working!',
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Health endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic auth routes for testing
app.post('/api/auth/signup', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Signup endpoint working!',
        data: req.body 
    });
});

app.post('/api/auth/login', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Login endpoint working!',
        data: req.body 
    });
});

function killExistingProcesses() {
    return new Promise((resolve) => {
        console.log('🔄 Killing existing Node processes...');
        exec('taskkill /F /IM node.exe 2>nul', () => {
            exec('for /f "tokens=5" %a in (\'netstat -ano ^| findstr :5000\') do taskkill /F /PID %a 2>nul', () => {
                setTimeout(resolve, 2000);
            });
        });
    });
}

async function startServer() {
    // Kill existing processes
    await killExistingProcesses();
    
    console.log('🔍 Connecting to MongoDB...');
    
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.log('⚠️ MongoDB connection failed, but server will still start');
    }
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🔗 Frontend URL: http://localhost:3000`);
        console.log(`🔗 Backend URL: http://localhost:${PORT}`);
        console.log(`💚 Test endpoint: http://localhost:${PORT}/test`);
        console.log('✅ Ready for signup/login requests!');
    });
}

startServer().catch(console.error);
