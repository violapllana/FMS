const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @swagger
 * /api/users/register:
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
 *               name:
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
 * /api/users/login:
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

module.exports = router;
