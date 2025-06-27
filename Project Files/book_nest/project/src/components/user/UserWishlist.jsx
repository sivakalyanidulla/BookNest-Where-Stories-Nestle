import React from 'react';
import { Heart, Eye, ShoppingCart, Trash2 } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';

const UserWishlist = () => {
  const { books, wishlist, removeFromWishlist, addToCart } = useBooks();
  const wishlistBooks = books.filter(book => wishlist.includes(book.id));

  const handleRemoveFromWishlist = (bookId) => {
    removeFromWishlist(bookId);
  };

  const handleAddToCart = (bookId) => {
    addToCart(bookId);
  };

  if (wishlistBooks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-600">Start adding books you love to your wishlist!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h2>
        <p className="text-gray-600">Books you've saved for later</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistBooks.map((book) => (
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
              
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => handleRemoveFromWishlist(book.id)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </button>
                
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={() => handleAddToCart(book.id)}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWishlist;