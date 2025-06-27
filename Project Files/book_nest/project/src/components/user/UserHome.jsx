import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';

const UserHome = () => {
  const { books } = useBooks();
  const bestSellers = books.filter(book => book.bestseller);
  const topRecommendations = books.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome Back to BookNest
        </h2>
        <p className="text-xl text-gray-600">
          Discover your next great read from our curated collection
        </p>
      </div>

      {/* Best Sellers Section */}
      <section className="mb-16">
        <div className="flex items-center justify-center mb-8">
          <Star className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-3xl font-bold text-gray-900">Best Sellers</h3>
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
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-blue-600">₹{book.price}</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Bestseller
                  </span>
                </div>
                <Link to={`/user/book/${book.id}`}>
                  <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Recommendations */}
      <section>
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
          <h3 className="text-3xl font-bold text-gray-900">Top Recommendations</h3>
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
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-blue-600">₹{book.price}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </span>
                </div>
                <Link to={`/user/book/${book.id}`}>
                  <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserHome;
