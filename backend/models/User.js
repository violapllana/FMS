const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username është i detyrueshëm'],
  },
  email: {
    type: String,
    required: [true, 'Email-i është i detyrueshëm'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Vendos një email valid',
    ],
  },
  password: {
    type: String,
    required: [false],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['student', 'profesor', 'admin'],
    default: 'student',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
