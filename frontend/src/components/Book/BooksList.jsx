import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const BooksList = () => {
  // States
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

  // Refs
  const toastTimeoutRef = useRef(null);
  const modalCloseBtnRef = useRef(null);

  const apiUrl = 'http://localhost:5000/books';

  // Fetch books from API
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

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter, search, and sort books
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

    tempBooks.sort((a, b) =>
      sortBy === 'title'
        ? a.title.localeCompare(b.title)
        : a.author.localeCompare(b.author)
    );

    setFilteredBooks(tempBooks);
  }, [books, searchTerm, searchAuthor, sortBy, availabilityFilter]);

  // Favorite toggle handler
  const toggleFavorite = (bookId) => {
    let updatedFavorites;
    let message;

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

  // Show toast notification
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Modal open/close handlers
  const openDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const closeDetails = () => {
    setSelectedBook(null);
    setShowDetailsModal(false);
  };

  // Focus close button when modal opens
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

      {/* Search, Filter & Sort Section */}
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
          <p className="text-center text-red-600 text-lg font-semibold mt-20">
            {error}
          </p>
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
                      isFavorite
                        ? 'text-red-500'
                        : 'text-gray-300 hover:text-red-400'
                    }`}
                    aria-label={
                      isFavorite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
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

                  {/* Book Image & Title */}
                  <img
                    src={book.imageUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-center text-lg font-semibold text-indigo-700 px-2">
                    {book.title}
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-20">
            No books found matching your criteria.
          </p>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedBook && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative shadow-lg">
              <button
                ref={modalCloseBtnRef}
                onClick={closeDetails}
                aria-label="Close book details"
                className="absolute top-4 right-4 text-gray-700 hover:text-indigo-600 text-3xl font-bold focus:outline-none"
              >
                &times;
              </button>

              <h2
                id="modalTitle"
                className="text-3xl font-bold text-indigo-700 mb-4 text-center"
              >
                {selectedBook.title}
              </h2>

              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedBook.imageUrl}
                  alt={`Cover of ${selectedBook.title}`}
                  className="w-full md:w-48 rounded-xl object-cover shadow-md"
                />
                <div className="flex flex-col gap-3">
                  <p>
                    <strong>Author:</strong> {selectedBook.author}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedBook.category}
                  </p>
                  <p>
                    <strong>Pages:</strong> {selectedBook.pages}
                  </p>
                  <p>
                    <strong>Available:</strong>{' '}
                    {selectedBook.available ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </p>
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedBook.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
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

export default BooksList;
