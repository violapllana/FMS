import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteBooks');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  const modalCloseBtnRef = useRef(null);

  const apiUrl = 'http://localhost:5000/books';

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(apiUrl);
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const toggleFavorite = (bookId) => {
    let updatedFavorites = [];
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
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    let tempBooks = [...books];

    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      tempBooks = tempBooks.filter((book) =>
        book.title.toLowerCase().includes(lowerSearch)
      );
    }

    if (searchAuthor.trim() !== '') {
      const lowerAuthor = searchAuthor.toLowerCase();
      tempBooks = tempBooks.filter((book) =>
        book.author.toLowerCase().includes(lowerAuthor)
      );
    }

    if (availabilityFilter !== 'all') {
      tempBooks = tempBooks.filter((book) =>
        availabilityFilter === 'available' ? book.available : !book.available
      );
    }

    tempBooks.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return a.author.localeCompare(b.author);
      }
    });

    setFilteredBooks(tempBooks);
  }, [books, searchTerm, searchAuthor, sortBy, availabilityFilter]);

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

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600 h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg text-center px-4">
          Explore Our Book Collection
        </h1>
      </div>

      {/* Search, Filter and Sort */}
      <section className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-4 flex-wrap w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Title..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search books by title"
          />
          <input
            type="text"
            placeholder="Filter by Author..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            aria-label="Filter books by author"
          />
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label="Filter by availability"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="sort" className="text-gray-700 font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label="Sort books"
          >
            <option value="title">Title (A-Z)</option>
            <option value="author">Author (A-Z)</option>
          </select>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16 min-h-[400px] relative">
        {loading ? (
          <p className="text-center text-indigo-600 text-lg font-semibold mt-20">
            Loading books...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg font-semibold mt-20">{error}</p>
        ) : filteredBooks.length > 0 ? (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => {
              const isFavorite = favorites.includes(book._id);
              return (
                <div
                  key={book._id}
                  className="bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col items-center p-4 relative"
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
                    className={`absolute top-3 right-3 text-3xl transition-colors duration-300 ${
                      isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                    }`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                        className="w-7 h-7"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Book Image & Title only */}
                  <img
                    src={book.imageUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-indigo-700 font-semibold text-xl text-center">
                    {book.title}
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-20 text-lg">No books found.</p>
        )}

        {/* Modal for Details */}
        {showDetailsModal && selectedBook && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            onClick={closeDetails}
          >
            <div
              className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDetails}
                ref={modalCloseBtnRef}
                aria-label="Close details modal"
                className="absolute top-3 right-3 text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <img
                src={selectedBook.imageUrl}
                alt={`Cover of ${selectedBook.title}`}
                className="w-full h-64 object-cover rounded-xl mb-4"
                loading="lazy"
              />

              <h2 id="modalTitle" className="text-2xl font-bold mb-2 text-indigo-700">
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


              {/* Favorite Toggle in Modal */}
              <button
                onClick={() => toggleFavorite(selectedBook._id)}
                className={`w-full py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
                  favorites.includes(selectedBook._id) ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {favorites.includes(selectedBook._id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
            {toastMessage}
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default BooksList;
