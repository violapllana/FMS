const express = require('express');
const router = express.Router();
const {
  createProfessor,
  getProfessorById,
  getProfessors,
  deleteProfessor,
  updateProfessor
} = require('../controllers/profesorController');

/**
 * @swagger
 * tags:
 *   name: Professors
 *   description: API për menaxhimin e profesorëve
 */

/**
 * @swagger
 * /api/professors:
 *   post:
 *     summary: Krijon një profesor të ri
 *     tags: [Professors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
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
 *         description: Profesori u krijua me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 *       500:
 *         description: Gabim i serverit
 */
router.post('/', createProfessor);

/**
 * @swagger
 * /api/professors:
 *   get:
 *     summary: Merr të gjithë profesorët
 *     tags: [Professors]
 *     responses:
 *       200:
 *         description: Lista e profesorëve
 *       500:
 *         description: Gabim i serverit
 */
router.get('/', getProfessors);

/**
 * @swagger
 * /api/professors/{id}:
 *   get:
 *     summary: Merr profesorin me ID
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID e profesorit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detajet e profesorit
 *       404:
 *         description: Profesori nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.get('/:id', getProfessorById);

/**
 * @swagger
 * /api/professors/{id}:
 *   put:
 *     summary: Përditëson një profesor ekzistues
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID e profesorit për përditësim
 *         schema:
 *           type: string
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profesori u përditësua me sukses
 *       404:
 *         description: Profesori nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.put('/:id', updateProfessor);

/**
 * @swagger
 * /api/professors/{id}:
 *   delete:
 *     summary: Fshin një profesor
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID e profesorit për fshirje
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profesori u fshi me sukses
 *       404:
 *         description: Profesori nuk u gjet
 *       500:
 *         description: Gabim i serverit
 */
router.delete('/:id', deleteProfessor);

module.exports = router;
