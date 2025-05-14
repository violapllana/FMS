const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Emri është i detyrueshëm'],
  },
  lastName: {
    type: String,
    required: [true, 'Mbiemri është i detyrueshëm'],
  },
  email: {
    type: String,
    required: [true, 'Email-i është i detyrueshëm'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Vendos një email valid',
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Numri i telefonit është i detyrueshëm'],
  },
  reason: {
    type: String,
    required: [true, 'Arsyeja është e detyrueshme'],
  },
  messageContent: {
    type: String,
    required: [true, 'Përmbajtja e mesazhit është e detyrueshme'],
  },
}, { timestamps: true });

module.exports = mongoose.model('ContactForm', contactFormSchema);
