const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API për menaxhimin e administratorëve
 */

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: 
 *     tags: [Admins]
 *     requestBody:
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admini u krijua me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 *       500:
 *         description: Gabim i serverit
 */
router.post('/', createAdmin);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: 
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Lista e adminëve
 *       500:
 *         description: Gabim i serverit
 */
router.get('/', getAdmins);

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     summary:
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID e adminit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detajet e adminit
 *       404:
 *         description: Admini nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.get('/:id', getAdminById);

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     summary: 
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         username: id
 *         required: true
 *         description: ID e adminit për përditësim
 *         schema:
 *           type: string
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admini u përditësua me sukses
 *       404:
 *         description: Admini nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.put('/:id', updateAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     summary: 
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         username: id
 *         required: true
 *         description: ID e adminit për fshirje
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admini u fshi me sukses
 *       404:
 *         description: Admini nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.delete('/:id', deleteAdmin);

module.exports = router;
