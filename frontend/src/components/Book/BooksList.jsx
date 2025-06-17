import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
    } catch {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
          Explore Our Book Collection
        </h1>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-4 flex-wrap w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Title..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Author..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
          >
            <option value="title">Title (A-Z)</option>
            <option value="author">Author (A-Z)</option>
          </select>
        </div>
      </section>

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
                >
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
                  >
                    {isFavorite ? '❤️' : '🤍'}
                  </button>
                  <img
                    src={book.imageUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
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

        {showDetailsModal && selectedBook && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative shadow-lg">
              <button
                ref={modalCloseBtnRef}
                onClick={closeDetails}
                className="absolute top-4 right-4 text-gray-700 hover:text-indigo-600 text-3xl font-bold focus:outline-none"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
                {selectedBook.title}
              </h2>

              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedBook.imageUrl}
                  alt={`Cover of ${selectedBook.title}`}
                  className="w-full md:w-48 rounded-xl object-cover shadow-md"
                />
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
                    {favorites.includes(selectedBook._id)
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'}
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

export default BooksList;
