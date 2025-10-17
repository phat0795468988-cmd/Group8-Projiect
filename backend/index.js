const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
	res.json({ status: 'ok' });
});

// Routes
app.use('/users', userRoutes);

module.exports = app;


