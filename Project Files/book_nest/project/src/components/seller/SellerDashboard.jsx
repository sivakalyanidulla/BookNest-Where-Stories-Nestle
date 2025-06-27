import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Store, Home, Package, Plus, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SellerHome from './SellerHome';
import SellerProducts from './SellerProducts';
import AddBook from './AddBook';
import SellerOrders from './SellerOrders';

const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/seller/home', icon: Home },
    { name: 'My Products', href: '/seller/products', icon: Package },
    { name: 'Add Books', href: '/seller/add-book', icon: Plus },
    { name: 'Orders', href: '/seller/orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8" />
              <h1 className="text-2xl font-bold">BookNest (Seller)</h1>
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
                        ? 'bg-purple-800 text-white'
                        : 'text-purple-100 hover:bg-purple-600 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-100 hover:bg-red-600 hover:text-white transition-colors"
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
        <Route path="/home" element={<SellerHome />} />
        <Route path="/products" element={<SellerProducts />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/orders" element={<SellerOrders />} />
        <Route path="/" element={<SellerHome />} />
      </Routes>
    </div>
  );
};

export default SellerDashboard;