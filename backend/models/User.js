const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  provider: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Vendos një email valid'] },
  password: { type: String, minlength: 6 },
  role: { type: String, enum: ['student', 'profesor', 'admin'], default: 'student' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
