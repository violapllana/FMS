const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: ID unike e përdoruesit
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [student, profesor, admin]
 *       example:
 *         username: testuser
 *         email: test@example.com
 *         password: secret123
 *         role: student
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Krijon një përdorues të ri
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Përdoruesi u krijua me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Merr të gjithë përdoruesit
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista e përdoruesve
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Merr një përdorues me ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e përdoruesit
 *     responses:
 *       200:
 *         description: Përdoruesi u gjet
 *       404:
 *         description: Përdoruesi nuk u gjet
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Përditëson një përdorues
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Përdoruesi u përditësua me sukses
 *       404:
 *         description: Përdoruesi nuk ekziston
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Fshin një përdorues
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e përdoruesit
 *     responses:
 *       200:
 *         description: Përdoruesi u fshi me sukses
 *       404:
 *         description: Përdoruesi nuk ekziston
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
