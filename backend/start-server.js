const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { spawn, exec } = require('child_process');
const net = require('net');

// Function to check if port is in use
function isPortInUse(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
            server.close(() => resolve(false));
        });
        server.on('error', () => resolve(true));
    });
}

// Function to kill all Node processes and processes on port 5000
function killProcesses() {
    return new Promise((resolve) => {
        console.log('🔄 Killing existing Node processes...');
        
        // Kill all node processes first
        exec('taskkill /F /IM node.exe', (error) => {
            // Ignore errors, process might not exist
            
            // Then kill any process on port 5000
            exec('for /f "tokens=5" %a in (\'netstat -ano ^| findstr :5000\') do taskkill /F /PID %a', (error) => {
                // Wait a moment for processes to fully terminate
                setTimeout(resolve, 3000);
            });
        });
    });
}

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Test MongoDB connection
console.log('🔍 Testing MongoDB connection...');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sufiyanali0727:erp1234@cluster0.o7uq2of.mongodb.net/erp_system?retryWrites=true&w=majority')
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Backend server is running',
        timestamp: new Date().toISOString()
    });
});

// Test route
app.get('/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'Backend API is working!',
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    console.log('🔍 Checking port 5000...');
    
    // Always kill existing processes first
    await killProcesses();
    
    console.log('🚀 Starting ERP Backend Server...');
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🔗 Test URL: http://localhost:${PORT}/test`);
        console.log(`💚 Health check: http://localhost:${PORT}/health`);
    });
}

startServer();
