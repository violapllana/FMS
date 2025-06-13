const express = require('express');
const router = express.Router();
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: 
 */

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: 
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - description
 *               - dueDays
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               available:
 *                 type: boolean
 *                 default: true
 *               dueDays:
 *                 type: number
 *                 enum: [7, 14, 21]
 *               imageUrl:
 *                 type: string
 *                 description: URL ose rruga e fotos së librit
 *     responses:
 *       201:
 *         description: Libri u shtua me sukses
 *       400:
 *         description: Kërkesa është e pavlefshme
 *       500:
 *         description: Dështim në shtimin e librit
 */
router.post('/add', addBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: 
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista e librave
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Dështim në marrjen e librave
 */
router.get('/', getBooks);

/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     summary: 
 *     tags: [Books]
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID e librit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libri u gjet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libri nuk u gjet
 *       500:
 *         description: Dështim në marrjen e librit
 */
router.get('/:bookId', getBookById);

/**
 * @swagger
 * /books/update/{bookId}:
 *   put:
 *     summary: 
 *     tags: [Books]
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID-ja e librit për t'u përditësuar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               available:
 *                 type: boolean
 *               dueDays:
 *                 type: number
 *                 enum: [7, 14, 21]
 *               imageUrl:
 *                 type: string
 *                 description: URL ose rruga e fotos së librit
 *     responses:
 *       200:
 *         description: Libri u përditësua me sukses
 *       400:
 *         description: dueDays është i pavlefshëm
 *       404:
 *         description: Libri nuk u gjet
 *       500:
 *         description: Dështim në përditësimin e librit
 */
router.put('/update/:bookId', updateBook);

/**
 * @swagger
 * /books/delete/{bookId}:
 *   delete:
 *     summary:
 *     tags: [Books]
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID-ja e librit për t'u fshirë
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libri u fshi me sukses
 *       404:
 *         description: Libri nuk u gjet
 *       500:
 *         description: Dështim në fshirjen e librit
 */
router.delete('/delete/:bookId', deleteBook);

module.exports = router;
