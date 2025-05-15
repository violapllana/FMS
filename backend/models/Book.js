const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true },
  dueDays: { type: Number, enum: [7, 14, 21], required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
