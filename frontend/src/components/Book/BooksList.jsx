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
  const [sortBy, setSortBy] = useState('title'); // "title" ose "author"
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'available' | 'not-available'

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref për fokus kur hap modalin
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

  // Funksion për toggle favorite dhe ruajtje në localStorage
  const toggleFavorite = (bookId) => {
    let updatedFavorites = [];
    if (favorites.includes(bookId)) {
      updatedFavorites = favorites.filter((id) => id !== bookId);
    } else {
      updatedFavorites = [...favorites, bookId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
  };

  // Filter + Sort + Search efektiv
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

    tempBooks.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return a.author.localeCompare(b.author);
      }
    });

    setFilteredBooks(tempBooks);
  }, [books, searchTerm, searchAuthor, sortBy]);

  const openDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const closeDetails = () => {
    setSelectedBook(null);
    setShowDetailsModal(false);
  };

  // Fokus tek butoni i mbylljes kur modal hapet
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

      {/* Search and Sort Filters */}
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
      <main className="max-w-7xl mx-auto px-6 pb-16 min-h-[400px]">
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
                    className={`absolute top-4 right-4 text-2xl transition-colors duration-300 ${
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
                        className="w-6 h-6"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
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

                  {/* Image */}
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-2xl mb-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  <h3 className="text-indigo-700 font-semibold text-xl text-center">{book.title}</h3>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-20 text-lg">No books to display.</p>
        )}
      </main>

      {/* Details Modal */}
      {showDetailsModal && selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          onClick={closeDetails}
          tabIndex={-1}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={modalCloseBtnRef}
              onClick={closeDetails}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
              aria-label="Close details"
            >
              &times;
            </button>

            {selectedBook.imageUrl ? (
              <img
                src={selectedBook.imageUrl}
                alt={selectedBook.title}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}

            <h2
              id="modal-title"
              className="text-indigo-700 text-3xl font-bold mb-4"
            >
              {selectedBook.title}
            </h2>

            <p className="mb-3 font-semibold">
              Author: <span className="font-normal">{selectedBook.author}</span>
            </p>

            <p
              id="modal-desc"
              className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap"
            >
              <strong>Description:</strong> {selectedBook.description}
            </p>

            <div className="flex gap-6 text-gray-700 font-medium">
              <p>
                <strong>Available:</strong>{' '}
                <span className={selectedBook.available ? 'text-green-600' : 'text-red-600'}>
                  {selectedBook.available ? 'Yes' : 'No'}
                </span>
              </p>
              <p>
                <strong>Due Days:</strong> {selectedBook.dueDays || 7} days
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BooksList;
