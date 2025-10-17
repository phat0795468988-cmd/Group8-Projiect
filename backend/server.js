const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./index');

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  try {
    if (!MONGODB_URI) {
      throw new Error('Missing MONGODB_URI environment variable');
    }
    await mongoose.connect(MONGODB_URI, {
      // modern defaults, no deprecations needed in Mongoose 7+
    });
    console.log('MongoDB connected');

    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();



