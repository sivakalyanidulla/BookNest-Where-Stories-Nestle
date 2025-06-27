import React from 'react';
import { Package, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';

const SellerHome = () => {
  const { getSellerBooks, getSellerOrders } = useBooks();
  const sellerBooks = getSellerBooks(1); // Assuming seller ID is 1 for demo
  const sellerOrders = getSellerOrders(1);

  const stats = [
    {
      title: 'Items',
      value: sellerBooks.length.toString(),
      icon: Package,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Total Orders',
      value: sellerOrders.length.toString(),
      icon: ShoppingBag,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'Revenue',
      value: `₹${sellerOrders.reduce((sum, order) => sum + order.price, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Growth',
      value: '+23%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  const chartData = [
    { month: 'Jan', sales: 2 },
    { month: 'Feb', sales: 4 },
    { month: 'Mar', sales: 6 },
    { month: 'Apr', sales: 3 },
    { month: 'May', sales: 8 },
    { month: 'Jun', sales: 5 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to your seller dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Sales Overview</h3>
        <div className="flex items-end justify-center space-x-8 h-64">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-12 mb-2 hover:from-blue-600 hover:to-blue-500 transition-colors"
                style={{ height: `${data.sales * 25}px` }}
              ></div>
              <span className="text-sm text-gray-600 font-medium">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Monthly Sales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {sellerOrders.slice(0, 3).map((order, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">New order received</p>
                  <p className="text-sm text-gray-600">{order.productName} - Order #{order.orderId}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
          {sellerOrders.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerHome;