import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Home, Book, Heart, Package, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserHome from './UserHome';
import UserBooks from './UserBooks';
import UserWishlist from './UserWishlist';
import UserOrders from './UserOrders';
import BookView from './BookView';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/user/home', icon: Home },
    { name: 'Books', href: '/user/books', icon: Book },
    { name: 'Wishlist', href: '/user/wishlist', icon: Heart },
    { name: 'My Orders', href: '/user/orders', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <h1 className="text-2xl font-bold">BookNest</h1>
            </div>
            <div className="flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-red-600 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <Routes>
        <Route path="/home" element={<UserHome />} />
        <Route path="/books" element={<UserBooks />} />
        <Route path="/book/:id" element={<BookView />} />
        <Route path="/wishlist" element={<UserWishlist />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/" element={<UserHome />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;