  import { useState, useEffect } from 'react';
  import axios from 'axios';

  const BooksPanel = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(true);
  const [dueDays, setDueDays] = useState(7); // default 7 ditë
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBookId, setCurrentBookId] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

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

    const resetForm = () => {
      setTitle('');
      setAuthor('');
      setDescription('');
      setAvailable(true);
      setDueDays('');
      setCurrentBookId(null);
    };

  // Ndryshoni handleCreate dhe handleUpdate për të dërguar dueDays
 const handleCreate = async (e) => {
  e.preventDefault();
  try {
    const newBook = {
      title,
      author,
      description,
      available,
       dueDays: Number(dueDays),
  
    };
    await axios.post(`${apiUrl}/add`, newBook);
    fetchBooks();
    setShowFormModal(false);
    resetForm();
  } catch (error) {
    console.error('Error creating book:', error);
  }
};

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = {
        title,
        author,
        description,
        available,
        dueDays,
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

const handleEdit = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}/${id}`);
    const book = res.data;
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setAvailable(book.available);
    setDueDays(book.dueDays || 7);  // vetëm dueDays
    setCurrentBookId(id);
    setIsEditMode(true);
    setShowFormModal(true);
  } catch (error) {
    console.error('Error fetching book:', error);
  }
};


    const handleDelete = async () => {
      try {
        await axios.delete(`${apiUrl}/delete/${bookToDelete}`);
        fetchBooks();
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    return (
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 flex justify-between items-center">
          Books
          <button
            onClick={() => {
              setIsEditMode(false);
              resetForm();
              setShowFormModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Add Book
          </button>
        </h2>

        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
     <thead>
  <tr>
    <th>#</th>
    <th>Title</th>
    <th>Author</th>
    <th>Description</th>
    <th>Available</th>
    <th>Due Days</th>
    <th>Actions</th>
  </tr>
</thead>


          <tbody className="text-sm text-gray-700">
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.description}</td>
                  <td className="px-6 py-4">{book.available ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">{book.dueDays || 7} days</td>
               
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(book._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setBookToDelete(book._id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  No books to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h3 className="text-lg font-semibold">
                Are you sure you want to delete this book?
              </h3>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showFormModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-auto">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? 'Update Book' : 'Add New Book'}
              </h2>
              <form onSubmit={isEditMode ? handleUpdate : handleCreate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    rows={3}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Available</label>
                  <select
                    value={available ? 'yes' : 'no'}
                    onChange={(e) => setAvailable(e.target.value === 'yes')}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Due Days</label>
    <select
      value={dueDays}
      onChange={(e) => setDueDays(Number(e.target.value))}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
    >
      <option value={7}>7 days</option>
      <option value={14}>14 days</option>
      <option value={21}>21 days</option>
    </select>
  </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFormModal(false);
                      resetForm();
                      setIsEditMode(false);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {isEditMode ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default BooksPanel;
