const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async (req, res) => {
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

    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në krijimin e adminit', error: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e adminëve', error });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.params.id, role: 'admin' });
    if (!admin) return res.status(404).json({ message: 'Admini nuk u gjet' });

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e adminit', error });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = await User.findOne({ _id: req.params.id, role: 'admin' });

    if (!admin) return res.status(404).json({ message: 'Admini nuk u gjet' });

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      admin.password = hashed;
    }

    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësim', error });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findOneAndDelete({ _id: req.params.id, role: 'admin' });
    if (!admin) return res.status(404).json({ message: 'Admini nuk ekziston' });

    res.status(200).json({ message: 'Admini u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirje', error });
  }
};

module.exports = { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin };
