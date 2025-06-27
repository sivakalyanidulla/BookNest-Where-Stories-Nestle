import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';

const SellerOrders = () => {
  const { getSellerOrders } = useBooks();
  const orders = getSellerOrders(1); // Assuming seller ID is 1

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'on the way':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h2>
        <p className="text-gray-600">All customer orders for your books</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">No Orders Yet</h3>
          <p className="text-gray-600">Once a customer buys your book, it will show up here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-10 h-14 object-cover rounded-lg border"
                    />
                    <span className="text-sm font-medium text-gray-900">{order.productName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Customer #{order.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.bookingDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.deliveryBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                    ₹{order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
