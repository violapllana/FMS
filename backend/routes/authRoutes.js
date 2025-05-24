const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const passport = require('passport');




router.get('/google', passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/student-dashboard',
    failureRedirect: '/login',
  })
);


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/student-dashboard',
    failureRedirect: '/login',
  })
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Regjistro përdoruesin
 *     description: Përdoret për të regjistruar një përdorues të ri.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum:
 *                   - student
 *                   - profesor
 *                   - admin
 *     responses:
 *       201:
 *         description: Përdoruesi u regjistrua me sukses
 *       400:
 *         description: Email është i regjistruar tashmë
 *       500:
 *         description: Gabim gjatë regjistrimit
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login për përdorues
 *     description: Përdoret për të hyrë në sistem.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login i suksesshëm dhe token JWT
 *       401:
 *         description: Fjalëkalimi i pasaktë
 *       404:
 *         description: Email-i nuk ekziston
 *       500:
 *         description: Gabim gjatë login-it
 */
router.post('/login', loginUser);


// Logout route
router.post('/logout', (req, res) => {
    req.logout(err => {
      if (err) return res.status(500).json({ message: 'Logout failed' });
      res.clearCookie('connect.sid'); // nëse përdor session cookie
      res.status(200).json({ message: 'Logout successful' });
    });
  });
  

module.exports = router;
