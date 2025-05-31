import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const Favorites = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteBooks');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  const modalCloseBtnRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5000/books');
        setBooks(res.data);
      } catch (err) {
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter favorite books
  const favoriteBooks = books.filter((book) => favorites.includes(book._id));

  const toggleFavorite = (bookId) => {
    let updatedFavorites;
    let message = '';
    if (favorites.includes(bookId)) {
      updatedFavorites = favorites.filter((id) => id !== bookId);
      message = 'Removed from favorites';
    } else {
      updatedFavorites = [...favorites, bookId];
      message = 'Added to favorites';
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
    showToastMessage(message);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
  };

  const openDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const closeDetails = () => {
    setSelectedBook(null);
    setShowDetailsModal(false);
  };

  useEffect(() => {
    if (showDetailsModal && modalCloseBtnRef.current) {
      modalCloseBtnRef.current.focus();
    }
  }, [showDetailsModal]);

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-10">Favorites</h1>

        {loading ? (
          <p className="text-center text-indigo-600 text-lg">Loading favorite books...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : favoriteBooks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">You have no favorite books yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {favoriteBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-3xl shadow-lg flex flex-col items-center p-4 relative cursor-pointer hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1"
                onClick={() => openDetails(book)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openDetails(book);
                }}
                role="button"
                aria-label={`View details of ${book.title}`}
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(book._id);
                  }}
                  className="absolute top-3 right-3 text-3xl text-red-500 hover:text-red-600"
                  aria-label="Remove from favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className="w-7 h-7"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>

                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <h3 className="text-indigo-700 font-semibold text-xl text-center">{book.title}</h3>
             
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Book Details */}
      {showDetailsModal && selectedBook && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          onClick={closeDetails}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDetails}
              ref={modalCloseBtnRef}
              aria-label="Close details modal"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-7 h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedBook.imageUrl ? (
              <img
                src={selectedBook.imageUrl}
                alt={`Cover of ${selectedBook.title}`}
                className="w-full h-64 object-cover rounded-2xl mb-6"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <h2 id="modalTitle" className="text-3xl font-extrabold text-indigo-700 mb-4">
              {selectedBook.title}
            </h2>
             <p className="text-gray-700 mb-1">
                <strong>Author:</strong> {selectedBook.author}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Available:</strong>{' '}
                {selectedBook.available ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Description:</strong> {selectedBook.description}
              </p>
          <p className="text-gray-700 mb-1">
  <strong>Days:</strong> {selectedBook.dueDays} days
</p>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {showToast && (
        <div
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg z-50"
          role="alert"
          aria-live="assertive"
        >
          {toastMessage}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Favorites;
