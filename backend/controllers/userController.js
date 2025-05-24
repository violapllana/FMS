const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ✅ CREATE USER
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Emaili është në përdorim.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'student', // nëse nuk dërgohet, default 'student'
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në krijimin e përdoruesit', error: error.message });
  }
};

// ✅ GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // të gjithë userat
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e përdoruesve', error });
  }
};

// ✅ GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e përdoruesit', error });
  }
};

// ✅ UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësim', error });
  }
};

// ✅ DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk ekziston' });

    res.status(200).json({ message: 'Përdoruesi u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirje', error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
