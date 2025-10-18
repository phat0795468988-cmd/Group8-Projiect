const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./index');

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://testuser:testpass123@cluster0.8ciikqw.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster01';

async function start() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');

    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
      console.log(`📊 API endpoints:`);
      console.log(`   GET  http://localhost:${PORT}/users`);
      console.log(`   POST http://localhost:${PORT}/users`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('🔄 Starting server without database (in-memory mode)...');
    
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT} (no database)`);
      console.log('⚠️  Note: Data will not persist without MongoDB connection');
    });
  }
}

start();



