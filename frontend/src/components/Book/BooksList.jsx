import { useState, useEffect } from 'react';
import axios from 'axios';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // për modal detajesh
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const apiUrl = 'http://localhost:5000/books';

  const fetchBooks = async () => {
    try {
      const res = await axios.get(apiUrl);
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const closeDetails = () => {
    setSelectedBook(null);
    setShowDetailsModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              onClick={() => openDetails(book)}
              className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{book.title}</h3>
              <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
              <p className="text-gray-600 truncate">{book.description}</p>
            </div>
          ))
        ) : (
          <p>No books to display.</p>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedBook && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeDetails}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p className="mb-2"><strong>Description:</strong> {selectedBook.description}</p>
            <p><strong>Available:</strong> {selectedBook.available ? 'Yes' : 'No'}</p>
            <p><strong>Due Days:</strong> {selectedBook.dueDays || 7} days</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksList;
