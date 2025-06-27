import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Home, Users, Store, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminHome from './AdminHome';
import AdminUsers from './AdminUsers';
import AdminSellers from './AdminSellers';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/admin/home', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Sellers', href: '/admin/sellers', icon: Store },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-gray-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <h1 className="text-2xl font-bold">BookNest Admin</h1>
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
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-100 hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-100 hover:bg-red-600 hover:text-white transition-colors"
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
        <Route path="/home" element={<AdminHome />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/sellers" element={<AdminSellers />} />
        <Route path="/" element={<AdminHome />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;