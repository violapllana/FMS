// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const BooksList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null); // për modal detajesh
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   const apiUrl = 'http://localhost:5000/books';

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get(apiUrl);
//       setBooks(res.data);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const openDetails = (book) => {
//     setSelectedBook(book);
//     setShowDetailsModal(true);
//   };

//   const closeDetails = () => {
//     setSelectedBook(null);
//     setShowDetailsModal(false);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-semibold mb-6">Books</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div
//               key={book._id}
//               onClick={() => openDetails(book)}
//               className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold mb-2">{book.title}</h3>
//               <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
//               <p className="text-gray-600 truncate">{book.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No books to display.</p>
//         )}
//       </div>

//       {/* Details Modal */}
//       {showDetailsModal && selectedBook && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
//             <button
//               onClick={closeDetails}
//               className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
//             <p><strong>Author:</strong> {selectedBook.author}</p>
//             <p className="mb-2"><strong>Description:</strong> {selectedBook.description}</p>
//             <p><strong>Available:</strong> {selectedBook.available ? 'Yes' : 'No'}</p>
//             <p><strong>Due Days:</strong> {selectedBook.dueDays || 7} days</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BooksList;
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
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
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600 h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg text-center px-4">
          Explore Our Book Collection
        </h1>
      </div>

      {/* Books Grid Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {books.length > 0 ? (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                onClick={() => openDetails(book)}
                className="bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col items-center p-4"
              >
                {/* Only Image and Title */}
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
            ))}
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
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative overflow-auto max-h-[90vh]">
            <button
              onClick={closeDetails}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
              aria-label="Close details"
            >
              &times;
            </button>

            {/* Image */}
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

            <h2 className="text-indigo-700 text-3xl font-bold mb-4">{selectedBook.title}</h2>

            <p className="mb-3 font-semibold">
              Author: <span className="font-normal">{selectedBook.author}</span>
            </p>

            <p className="mb-4 text-gray-700 leading-relaxed">
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
