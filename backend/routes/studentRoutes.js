const express = require('express');
const router = express.Router();
const {
  createStudent,
  updateStudent,
  getStudentById,
  getStudents,
  deleteStudent
} = require('../controllers/studentController');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API për menaxhimin e studentëve
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: 
 *     tags: [Students]
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
 *         description: Student i krijuar me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 *       500:
 *         description: Gabim i serverit
 */
router.post('/', createStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary:
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista e studentëve
 *       500:
 *         description: Gabim i serverit
 */
router.get('/', getStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary:
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         username: id
 *         required: true
 *         description: ID e studentit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detajet e studentit
 *       404:
 *         description: Studenti nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.get('/:id', getStudentById);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: 
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         username: id
 *         required: true
 *         description: ID e studentit për përditësim
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
 *         description: Studenti u përditësua me sukses
 *       404:
 *         description: Studenti nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.put('/:id', updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: 
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         username: id
 *         required: true
 *         description: ID e studentit për fshirje
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Studenti u fshi me sukses
 *       404:
 *         description: Studenti nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.delete('/:id', deleteStudent);

module.exports = router;
