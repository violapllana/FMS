import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from '../Footer';

const Favorites = () => {
  const [books, setBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const toastTimeoutRef = useRef(null);
  const modalCloseBtnRef = useRef(null);

  const apiUrl = 'http://localhost:5000/books';

  // Load favorite book IDs from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteBooks');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch all books from backend to get full book info
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(apiUrl);
      setBooks(res.data);
    } catch {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // On mount, fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books to only favorites
  useEffect(() => {
    if (books.length > 0) {
      const favBooks = books.filter((book) => favorites.includes(book._id));
      setFavoriteBooks(favBooks);
    }
  }, [books, favorites]);

  // Toggle favorite (remove from favorites in this case)
  const toggleFavorite = (bookId) => {
    let updatedFavorites;
    let message;

    if (favorites.includes(bookId)) {
      updatedFavorites = favorites.filter((id) => id !== bookId);
      message = 'Removed from favorites';
    } else {
      // You can add back to favorites if you want, but usually in Favorites page it removes
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
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
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
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600 h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg text-center px-4">
          Your Favorite Books
        </h1>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-16 min-h-[400px] relative">
        {loading ? (
          <p className="text-center text-indigo-600 text-lg font-semibold mt-20">
            Loading favorite books...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg font-semibold mt-20">{error}</p>
        ) : favoriteBooks.length > 0 ? (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col items-center p-4 relative"
                onClick={() => openDetails(book)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openDetails(book);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(book._id);
                  }}
                  className="absolute top-3 right-3 text-3xl text-red-500 hover:text-red-600"
                  aria-label="Remove from favorites"
                >
                  ❤️
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

                <h3 className="text-center text-lg font-semibold text-indigo-700 px-2">{book.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-20">You have no favorite books yet.</p>
        )}

        {showDetailsModal && selectedBook && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative shadow-lg">
              <button
                ref={modalCloseBtnRef}
                onClick={closeDetails}
                className="absolute top-4 right-4 text-gray-700 hover:text-indigo-600 text-3xl font-bold focus:outline-none"
                aria-label="Close details modal"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">{selectedBook.title}</h2>

              <div className="flex flex-col md:flex-row gap-6">
                {selectedBook.imageUrl ? (
                  <img
                    src={selectedBook.imageUrl}
                    alt={`Cover of ${selectedBook.title}`}
                    className="w-full md:w-48 rounded-xl object-cover shadow-md"
                  />
                ) : (
                  <div className="w-full md:w-48 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="flex flex-col gap-3">
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
                  <p className="text-gray-700 mb-1">
                    <strong>Days:</strong> {selectedBook.dueDays} days
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Description:</strong> {selectedBook.description}
                  </p>

                  <button
                    onClick={() => toggleFavorite(selectedBook._id)}
                    className={`w-full py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
                      favorites.includes(selectedBook._id)
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {favorites.includes(selectedBook._id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold animate-fade-in-out z-50">
            {toastMessage}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Favorites;
