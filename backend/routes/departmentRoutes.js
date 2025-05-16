const express = require('express');
const router = express.Router();
const {
  addDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       required:
 *         - name
 *         - director
 *         - location
 *         - email
 *         - phoneNumber
 *       properties:
 *         _id:
 *           type: string
 *           description: ID e departamentit
 *         name:
 *           type: string
 *           description: Emri i departamentit
 *         director:
 *           type: string
 *           description: Drejtori i departamentit
 *         location:
 *           type: string
 *           description: Vendndodhja e departamentit
 *         email:
 *           type: string
 *           description: Email i kontaktit
 *         phoneNumber:
 *           type: string
 *           description: Numri i telefonit
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: API për menaxhimin e departamenteve
 */

/**
 * @swagger
 * /departments/add:
 *   post:
 *     summary: Shton një ose më shumë departamente të reja
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Department'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Departamenti ose departamentet u shtuan me sukses
 *       400:
 *         description: Kërkesa është e pavlefshme
 *       500:
 *         description: Dështim në shtimin e departamentit
 */
router.post('/add', addDepartment);

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Merr të gjithë departamentet
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: Lista e departamenteve
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 *       500:
 *         description: Dështim në marrjen e departamenteve
 */
router.get('/', getDepartments);

/**
 * @swagger
 * /departments/{departmentId}:
 *   get:
 *     summary: Merr një departament sipas ID-së
 *     tags: [Departments]
 *     parameters:
 *       - name: departmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e departamentit
 *     responses:
 *       200:
 *         description: Departamenti u gjet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       404:
 *         description: Departamenti nuk u gjet
 *       500:
 *         description: Dështim në marrjen e departamentit
 */
router.get('/:departmentId', getDepartmentById);

/**
 * @swagger
 * /departments/update/{departmentId}:
 *   put:
 *     summary: Përditëson një departament ekzistues
 *     tags: [Departments]
 *     parameters:
 *       - name: departmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e departamentit për përditësim
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Departamenti u përditësua me sukses
 *       404:
 *         description: Departamenti nuk u gjet
 *       500:
 *         description: Dështim në përditësimin e departamentit
 */
router.put('/update/:departmentId', updateDepartment);

/**
 * @swagger
 * /departments/delete/{departmentId}:
 *   delete:
 *     summary: Fshin një departament
 *     tags: [Departments]
 *     parameters:
 *       - name: departmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e departamentit për fshirje
 *     responses:
 *       200:
 *         description: Departamenti u fshi me sukses
 *       404:
 *         description: Departamenti nuk u gjet
 *       500:
 *         description: Dështim në fshirjen e departamentit
 */
router.delete('/delete/:departmentId', deleteDepartment);

module.exports = router;
