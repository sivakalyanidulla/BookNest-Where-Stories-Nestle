import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';

const UserBooks = () => {
  const { books, addToWishlist, removeFromWishlist, isInWishlist } = useBooks();

  const handleWishlistToggle = (bookId) => {
    if (isInWishlist(bookId)) {
      removeFromWishlist(bookId);
    } else {
      addToWishlist(bookId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Books List</h2>
        <p className="text-gray-600">Explore our comprehensive collection of books</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-w-3 aspect-h-4 overflow-hidden">
              <img 
                src={book.image} 
                alt={book.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-gray-600 mb-3">Genre: {book.genre}</p>
              <p className="text-blue-600 font-bold text-xl mb-4">Price: ₹{book.price}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleWishlistToggle(book.id)}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isInWishlist(book.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {isInWishlist(book.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                
                <Link to={`/user/book/${book.id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooks;