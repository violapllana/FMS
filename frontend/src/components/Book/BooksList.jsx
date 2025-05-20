
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../Header';
// import Footer from '../Footer';

// const BooksList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
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
//     <>
//       <Header />

//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600 h-[300px] flex items-center justify-center">
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <h1 className="relative text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg text-center px-4">
//           Explore Our Book Collection
//         </h1>
//       </div>

//       {/* Books Grid Section */}
//       <main className="max-w-7xl mx-auto px-6 py-16">
//         {books.length > 0 ? (
//           <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//             {books.map((book) => (
//               <div
//                 key={book._id}
//                 onClick={() => openDetails(book)}
//                 className="bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col items-center p-4"
//               >
//                 {/* Only Image and Title */}
//                 {book.imageUrl ? (
//                   <img
//                     src={book.imageUrl}
//                     alt={book.title}
//                     className="w-full h-48 object-cover rounded-2xl mb-4"
//                     loading="lazy"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center text-gray-400">
//                     No Image
//                   </div>
//                 )}
//                 <h3 className="text-indigo-700 font-semibold text-xl text-center">{book.title}</h3>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600 mt-20 text-lg">No books to display.</p>
//         )}
//       </main>

//       {/* Details Modal */}
//       {showDetailsModal && selectedBook && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-6"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative overflow-auto max-h-[90vh]">
//             <button
//               onClick={closeDetails}
//               className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
//               aria-label="Close details"
//             >
//               &times;
//             </button>

//             {/* Image */}
//             {selectedBook.imageUrl ? (
//               <img
//                 src={selectedBook.imageUrl}
//                 alt={selectedBook.title}
//                 className="w-full h-64 object-cover rounded-2xl mb-6"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center text-gray-400">
//                 No Image Available
//               </div>
//             )}

//             <h2 className="text-indigo-700 text-3xl font-bold mb-4">{selectedBook.title}</h2>

//             <p className="mb-3 font-semibold">
//               Author: <span className="font-normal">{selectedBook.author}</span>
//             </p>

//             <p className="mb-4 text-gray-700 leading-relaxed">
//               <strong>Description:</strong> {selectedBook.description}
//             </p>

//             <div className="flex gap-6 text-gray-700 font-medium">
//               <p>
//                 <strong>Available:</strong>{' '}
//                 <span className={selectedBook.available ? 'text-green-600' : 'text-red-600'}>
//                   {selectedBook.available ? 'Yes' : 'No'}
//                 </span>
//               </p>
//               <p>
//                 <strong>Due Days:</strong> {selectedBook.dueDays || 7} days
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
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

  // Shtojmë një state për favorite (lista e id-ve të librave favorit)
  const [favorites, setFavorites] = useState(() => {
    // Ngarko nga localStorage në fillim (ose kthe bosh nëse nuk ka)
    const saved = localStorage.getItem('favoriteBooks');
    return saved ? JSON.parse(saved) : [];
  });

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

  // Funksion për shtim/fshirje nga favorite
  const toggleFavorite = (bookId) => {
    let updatedFavorites = [];
    if (favorites.includes(bookId)) {
      // Hiq nga favorites
      updatedFavorites = favorites.filter((id) => id !== bookId);
    } else {
      // Shto në favorites
      updatedFavorites = [...favorites, bookId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
  };

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
            {books.map((book) => {
              const isFavorite = favorites.includes(book._id);
              return (
                <div
                  key={book._id}
                  className="bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col items-center p-4 relative"
                >
                  {/* Ikona zemrës në krye djathtas */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Mos lejo hapjen e modalit kur klikojmë zemrën
                      toggleFavorite(book._id);
                    }}
                    className={`absolute top-4 right-4 text-2xl transition-colors duration-300 ${
                      isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                    }`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {/* SVG zemra */}
                    {isFavorite ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="none" className="w-6 h-6">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    )}
                  </button>

                  {/* Only Image and Title */}
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-2xl mb-4"
                      loading="lazy"
                      onClick={() => openDetails(book)}
                    />
                  ) : (
                    <div
                      onClick={() => openDetails(book)}
                      className="w-full h-48 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center text-gray-400"
                    >
                      No Image
                    </div>
                  )}
                  <h3
                    onClick={() => openDetails(book)}
                    className="text-indigo-700 font-semibold text-xl text-center cursor-pointer"
                  >
                    {book.title}
                  </h3>
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
