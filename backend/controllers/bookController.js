const Book = require('../models/Book');


const addBook = async (req, res) => {
  try {
    const { title, author, description, available, dueDays, imageUrl } = req.body;

    if (![7, 14, 21].includes(Number(dueDays))) {
      return res.status(400).json({ message: 'dueDays must be 7, 14, or 21' });
    }

    const newBook = new Book({
      title,
      author,
      description,
      available,
      dueDays,
      imageUrl, 
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
};


const updateBook = async (req, res) => {
  try {
    const { title, author, description, available, dueDays, imageUrl } = req.body;
    const updateData = { title, author, description, available };

    if (dueDays) {
      if (![7, 14, 21].includes(Number(dueDays))) {
        return res.status(400).json({ message: 'dueDays must be 7, 14, or 21' });
      }
      updateData.dueDays = dueDays;
    }

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const book = await Book.findByIdAndUpdate(req.params.bookId, updateData, { new: true });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err.message });
  }
};


const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
};


const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
