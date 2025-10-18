const User = require('../models/User');
const mongoose = require('mongoose');

// Fallback in-memory storage khi MongoDB không kết nối được
let inMemoryUsers = [];
let nextId = 1;

exports.getUsers = async (req, res) => {
  try {
    // Nếu MongoDB đã kết nối, dùng database
    if (mongoose.connection.readyState === 1) {
      const users = await User.find().sort({ createdAt: -1 });
      return res.json(users);
    }
    
    // Fallback: dùng in-memory storage
    res.json(inMemoryUsers);
  } catch (err) {
    console.error('Database error:', err.message);
    // Fallback to in-memory
    res.json(inMemoryUsers);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name và email là bắt buộc' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    console.log('MongoDB connection state:', mongoose.connection.readyState);
    console.log('Creating user:', { name: trimmedName, email: trimmedEmail });

    // Nếu MongoDB đã kết nối, dùng database
    if (mongoose.connection.readyState === 1) {
      console.log('Using MongoDB database...');
      const created = await User.create({ name: trimmedName, email: trimmedEmail });
      console.log('User created in MongoDB:', created);
      return res.status(201).json(created);
    }

    console.log('MongoDB not connected, using in-memory storage...');
    // Fallback: kiểm tra email trùng lặp trong memory
    const existingUser = inMemoryUsers.find(user => user.email === trimmedEmail);
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }

    // Tạo user mới trong memory
    const newUser = {
      id: nextId++,
      name: trimmedName,
      email: trimmedEmail,
      createdAt: new Date().toISOString()
    };
    
    inMemoryUsers.unshift(newUser);
    console.log('User created in memory:', newUser);
    return res.status(201).json(newUser);

  } catch (err) {
    console.error('Database error:', err.message);
    console.error('Full error:', err);
    
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }
    
    // Fallback: tạo trong memory nếu database lỗi
    const { name, email } = req.body;
    if (name && email) {
      const newUser = {
        id: nextId++,
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString()
      };
      inMemoryUsers.unshift(newUser);
      console.log('Fallback: User created in memory:', newUser);
      return res.status(201).json(newUser);
    }
    
    return res.status(500).json({ message: 'Failed to create user' });
  }
};