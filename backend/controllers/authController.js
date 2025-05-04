const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Kontrollo nëse ekziston përdoruesi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email-i është i regjistruar' });
    }

    // Enkripto fjalëkalimin
    const hashedPassword = await bcrypt.hash(password, 10);

    // Krijo përdoruesin
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
    });

    res.status(201).json({ message: 'Përdoruesi u regjistrua me sukses' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë regjistrimit', error: err.message });
  }
};

// // LOGIN
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Kontrollo nëse ekziston përdoruesi
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'Email-i nuk ekziston' });
//     }

//     // Kontrollo fjalëkalimin
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Fjalëkalimi është i pasaktë' });
//     }

//     // Krijo token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.status(200).json({
//       message: 'Login i suksesshëm',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Gabim gjatë login-it', error: err.message });
//   }
// };
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
