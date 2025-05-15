const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createProfessor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Emaili është në përdorim.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProfessor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'profesor',
    });

    res.status(201).json(newProfessor);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në krijimin e profesorit', error: error.message });
  }
};

const getProfessors = async (req, res) => {
  try {
    const professors = await User.find({ role: 'profesor' });
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e profesorëve', error });
  }
};

const getProfessorById = async (req, res) => {
  try {
    const professor = await User.findOne({ _id: req.params.id, role: 'profesor' });
    if (!professor) return res.status(404).json({ message: 'Profesori nuk u gjet' });

    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e profesorit', error });
  }
};

const updateProfessor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const professor = await User.findOne({ _id: req.params.id, role: 'profesor' });

    if (!professor) return res.status(404).json({ message: 'Profesori nuk u gjet' });

    professor.name = name || professor.name;
    professor.email = email || professor.email;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      professor.password = hashed;
    }

    await professor.save();
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësim', error });
  }
};

const deleteProfessor = async (req, res) => {
  try {
    const professor = await User.findOneAndDelete({ _id: req.params.id, role: 'profesor' });
    if (!professor) return res.status(404).json({ message: 'Profesori nuk ekziston' });

    res.status(200).json({ message: 'Profesori u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirje', error });
  }
};

module.exports = {
  createProfessor,
  getProfessors,
  getProfessorById,
  updateProfessor,
  deleteProfessor
};
