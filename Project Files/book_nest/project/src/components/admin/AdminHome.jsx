import React from 'react';
import { Users, Store, Book, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';

const AdminHome = () => {
  const { users, sellers, books, orders } = useBooks();

  const stats = [
    {
      title: 'USERS',
      value: users.length.toString(),
      icon: Users,
      color: 'bg-red-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Vendors',
      value: sellers.length.toString(),
      icon: Store,
      color: 'bg-blue-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Items',
      value: books.length.toString(),
      icon: Book,
      color: 'bg-green-500',
      change: '+23%',
      changeType: 'increase'
    },
    {
      title: 'Total Orders',
      value: orders.length.toString(),
      icon: ShoppingBag,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  const chartData = [
    { label: 'Users', value: users.length, color: 'bg-purple-500' },
    { label: 'vendors', value: sellers.length, color: 'bg-cyan-500' },
    { label: 'Items', value: books.length, color: 'bg-blue-500' },
    { label: 'Orders', value: orders.length, color: 'bg-orange-500' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  const recentActivity = [
    {
      id: 1,
      type: 'New User',
      description: 'John Doe registered as a new user',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'New Seller',
      description: 'BookShop Inc. registered as a seller',
      time: '4 hours ago',
      icon: Store,
      color: 'text-purple-600'
    },
    {
      id: 3,
      type: 'New Order',
      description: `Order #${orders[0]?.orderId || 'N/A'} was placed`,
      time: '6 hours ago',
      icon: ShoppingBag,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">DashBoard</h2>
        <p className="text-gray-600">Overview of your BookNest platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.color} rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow`}>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">{stat.title}</h3>
                <p className="text-4xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-end justify-center space-x-8 h-64">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`${data.color} rounded-t-lg w-16 mb-2 hover:opacity-80 transition-opacity`}
                style={{ height: `${(data.value / maxValue) * 200}px` }}
              ></div>
              <span className="text-sm text-gray-600 font-medium">{data.label}</span>
              <span className="text-xs text-gray-500">{data.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Icon className={`h-5 w-5 ${activity.color} mr-3`} />
                  <div>
                    <p className="font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;