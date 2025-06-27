import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, TrendingUp } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';

const LandingPage = () => {
  const { books } = useBooks();
  const bestSellers = books.filter(book => book.bestseller);
  const topRecommendations = books.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <h1 className="text-2xl font-bold">BookNest</h1>
              <span className="text-blue-200 text-sm">Where Stories Nestle</span>
            </div>
            <div className="flex space-x-6">
              <Link 
                to="/user/login" 
                className="px-4 py-2 rounded-lg bg-white text-blue-700 font-medium hover:bg-blue-50 transition-colors"
              >
                User
              </Link>
              <Link 
                to="/seller/login" 
                className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                Seller
              </Link>
              <Link 
                to="/admin/login" 
                className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Great Read
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore thousands of books from bestselling authors and discover new stories that will captivate your imagination.
          </p>
        </div>

        {/* Best Sellers Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-3xl font-bold text-gray-900 text-center">Best Seller</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{book.title}</h4>
                  <p className="text-gray-600 mb-3">by {book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">₹{book.price}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Bestseller
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Recommendations */}
        <section>
          <div className="flex items-center justify-center mb-8">
            <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-3xl font-bold text-gray-900 text-center">Top Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRecommendations.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{book.title}</h4>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{book.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">₹{book.price}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            to="/user/login"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Start Reading Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;