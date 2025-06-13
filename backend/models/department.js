const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  director: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
