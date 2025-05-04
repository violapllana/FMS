const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body; // ndryshuar nga 'name' në 'username'

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email-i është i regjistruar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: username, // emri i fushës në databazë
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
      // Kontrollo nëse ekziston përdoruesi
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email-i nuk ekziston' });
      }
  
      // Kontrollo fjalëkalimin
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Fjalëkalimi është i pasaktë' });
      }
  
      // Krijo token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // Dërgo përgjigje me token dhe të dhënat e përdoruesit
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
  
module.exports = { registerUser, loginUser };
