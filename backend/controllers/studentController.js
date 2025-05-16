const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createStudent = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Emaili është në përdorim.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'student',
    });

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në krijimin e studentit', error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e studentëve', error });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Studenti nuk u gjet' });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e studentit', error });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const student = await User.findOne({ _id: req.params.id, role: 'student' });

    if (!student) return res.status(404).json({ message: 'Studenti nuk u gjet' });

    student.username = username || student.username;
    student.email = email || student.email;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      student.password = hashed;
    }

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësim', error });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({ _id: req.params.id, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Studenti nuk ekziston' });

    res.status(200).json({ message: 'Studenti u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirje', error });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
