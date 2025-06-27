import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';

const BookView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addToWishlist, removeFromWishlist, isInWishlist, placeOrder } = useBooks();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    flatNo: '',
    street: '',
    city: '',
    pincode: '',
    state: ''
  });

  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Book not found</h2>
          <button
            onClick={() => navigate('/user/books')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book.id);
    }
  };

  const handleBuyNow = () => {
    setShowOrderForm(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const fullAddress = `${orderDetails.flatNo}, ${orderDetails.street}, ${orderDetails.city}, ${orderDetails.state} - ${orderDetails.pincode}`;
    
    placeOrder(book.id, {
      address: fullAddress,
      userId: 1 // In a real app, this would come from auth context
    });

    alert('Order placed successfully!');
    setShowOrderForm(false);
    navigate('/user/orders');
  };

  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value
    });
  };

  if (showOrderForm) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your order is almost Done!</h2>
          
          <form onSubmit={handleOrderSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="flatNo"
                  placeholder="Flat no"
                  required
                  value={orderDetails.flatNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  required
                  value={orderDetails.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={orderDetails.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  required
                  value={orderDetails.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  value={orderDetails.state}
                  onChange={handleInputChange}
                  className="w-full md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-lg mx-auto mb-2"
                />
                <p className="text-center font-medium">{book.title}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Price:</span>
                <span>₹{book.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span>₹{book.price}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowOrderForm(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Order
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-8">
            <img 
              src={book.image} 
              alt={book.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="md:w-2/3 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              <p className="text-3xl font-bold text-blue-600 mb-6">₹{book.price}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{book.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Info</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Title:</span> {book.title}</p>
                  <p><span className="font-medium">Author:</span> {book.author}</p>
                  <p><span className="font-medium">Genre:</span> {book.genre}</p>
                  <p><span className="font-medium">Price:</span> ₹{book.price}</p>
                  <p><span className="font-medium">Seller:</span> {book.sellerName}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  isInWishlist(book.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                <Heart className="h-5 w-5 mr-2" />
                {isInWishlist(book.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button
                onClick={handleBuyNow}
                className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookView;