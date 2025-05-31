import { useState, useEffect } from 'react';
import axios from 'axios';

const BooksPanel = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'available' | 'not-available'

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(true);
  const [dueDays, setDueDays] = useState(7);
  const [imageUrl, setImageUrl] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const apiUrl = 'http://localhost:5000/books';

  // Fetch books
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

  // Filter books when searchTerm or availabilityFilter changes
  useEffect(() => {
    let filtered = books;

    // Filter by availability
    if (availabilityFilter === 'available') {
      filtered = filtered.filter(book => book.available);
    } else if (availabilityFilter === 'not-available') {
      filtered = filtered.filter(book => !book.available);
    }

    // Filter by search term (title or author)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, availabilityFilter]);

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setAvailable(true);
    setDueDays(7);
    setImageUrl('');
    setCurrentBookId(null);
  };

  // Create book
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newBook = {
        title,
        author,
        description,
        available,
        dueDays: Number(dueDays),
        imageUrl: imageUrl.trim() || undefined,
      };
      await axios.post(`${apiUrl}/add`, newBook);
      fetchBooks();
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = {
        title,
        author,
        description,
        available,
        dueDays: Number(dueDays),
        imageUrl: imageUrl.trim() || undefined,
      };
      await axios.put(`${apiUrl}/update/${currentBookId}`, updatedBook);
      fetchBooks();
      setIsEditMode(false);
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Edit book: load data in form
  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/${id}`);
      const book = res.data;
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setAvailable(book.available);
      setDueDays(book.dueDays || 7);
      setImageUrl(book.imageUrl || '');
      setCurrentBookId(id);
      setIsEditMode(true);
      setShowFormModal(true);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  // Delete book
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/delete/${bookToDelete}`);
      fetchBooks();
      setShowDeleteModal(false);
      setBookToDelete(null);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 flex justify-between items-center">
        Books Management
        <button
          onClick={() => {
            resetForm();
            setIsEditMode(false);
            setShowFormModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
        >
          Add Book
        </button>
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="not-available">Not Available</option>
        </select>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Available</th>
              <th className="px-6 py-3 text-left">Due Days</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr
                  key={book._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{book.description}</td>
                  <td className="px-6 py-4">
                    {book.available ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{book.dueDays || 7} days</td>
                  <td className="px-6 py-4">
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="h-16 w-auto object-contain rounded"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(book._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setBookToDelete(book._id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-8"
                >
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-5 relative shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Edit Book' : 'Add New Book'}
            </h3>
            <form onSubmit={isEditMode ? handleUpdate : handleCreate} className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span>Available</span>
                </label>
                <label>
                  <span className="block font-medium">Due Days</span>
                  <input
                    type="number"
                    min="1"
                    value={dueDays}
                    onChange={(e) => setDueDays(e.target.value)}
                    className="w-20 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>
              <div>
                <label className="block mb-1 font-medium">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Optional"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowFormModal(false);
                    setIsEditMode(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  {isEditMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPanel;
