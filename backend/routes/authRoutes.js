const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/facebook-login', async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(400).json({ message: 'Access token missing' });
  }

  try {

    const fbRes = await axios.get('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name,email',
        access_token: accessToken,
      },
    });

    const { id: facebookId, email, name } = fbRes.data;

    if (!email) {
      return res.status(400).json({ message: 'Facebook account has no email associated' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        facebookId,
        role: 'student', 
      });
    } else if (!user.facebookId) {
      user.facebookId = facebookId;
      await user.save();
    }

    if (!user.role) {
      user.role = 'student';
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error('Facebook login error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Facebook login failed' });
  }
});


router.post('/google-login', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const idToken = authHeader.split(' ')[1];

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
   
      user = await User.create({
       username: name,   
        email,
        googleId,
        role: 'student', 
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error('Google token verification failed', err);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 
 *     tags: [Auth]
 *     requestBody:
 *       description: Të dhënat për regjistrim të përdoruesit
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: Përdoruesi u regjistrua me sukses
 *       400:
 *         description: Të dhëna të pa plota ose të gabuara
 *       500:
 *         description: Gabim serveri
 */
router.post('/register', registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 
 *     tags: [Auth]
 *     requestBody:
 *       description: Kredencialet e përdoruesit për login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Login i suksesshëm, kthen token ose sesion
 *       401:
 *         description: Kredenciale të pavlefshme
 *       500:
 *         description: Gabim serveri
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary:
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout i suksesshëm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       500:
 *         description: Gabim serveri
 */

router.post('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
