const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email-i është i regjistruar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'student',
    });

    res.status(201).json({ message: 'Përdoruesi u regjistrua me sukses' });
  } catch (err) {
    console.error('Gabim në regjistrim:', err);
    res.status(500).json({ message: 'Gabim gjatë regjistrimit', error: err.message });
  }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email-i nuk ekziston' });
      }
  

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Fjalëkalimi është i pasaktë' });
      }
  

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  

      res.status(200).json({
        message: 'Login i suksesshëm',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ message: 'Gabim gjatë login-it', error: err.message });
    }
  };
  
 
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
      role: role || 'student',
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Gabim në krijimin e përdoruesit:', error);
    res.status(500).json({ message: 'Gabim në krijimin e përdoruesit', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
  } catch (error) {
    console.error('Gabim në marrjen e përdoruesve:', error);
    res.status(500).json({ message: 'Gabim në marrjen e përdoruesve', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Gabim në marrjen e përdoruesit:', error);
    res.status(500).json({ message: 'Gabim në marrjen e përdoruesit', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });

  
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Emaili është në përdorim nga një përdorues tjetër.' });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password && password.trim() !== '') {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();


    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.status(200).json(userToReturn);
  } catch (error) {
    console.error('Gabim në përditësim:', error);
    res.status(500).json({ message: 'Gabim në përditësim', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk ekziston' });

    res.status(200).json({ message: 'Përdoruesi u fshi me sukses' });
  } catch (error) {
    console.error('Gabim në fshirje:', error);
    res.status(500).json({ message: 'Gabim në fshirje', error: error.message });
  }
};
module.exports = { registerUser, loginUser, createUser, getAllUsers, getUserById, updateUser, deleteUser };
