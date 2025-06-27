import React, { useState } from 'react';
import { Store, Mail, Calendar, Package, Eye, Trash2 } from 'lucide-react';
import { useBooks } from '../../contexts/BookContext';
import SellerProductsModal from './SellerProductsModal';

const AdminSellers = () => {
  const { sellers, deleteSeller } = useBooks();
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [showProductsModal, setShowProductsModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewProducts = (sellerId) => {
    setSelectedSellerId(sellerId);
    setShowProductsModal(true);
  };

  const handleDeleteSeller = (sellerId) => {
    if (window.confirm('Are you sure you want to delete this seller? This will also delete all their products.')) {
      deleteSeller(sellerId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sellers</h2>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Sl/no
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  SellerId
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Seller name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
              {sellers.map((seller, index) => (
                <tr key={seller.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {seller.id.toString().padStart(16, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {seller.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {seller.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {seller.products}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(seller.status)}`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewProducts(seller.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        view
                      </button>
                      <button
                        onClick={() => handleDeleteSeller(seller.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seller Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Sellers</p>
              <p className="text-2xl font-bold text-gray-900">
                {sellers.filter(s => s.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">
                {sellers.filter(s => s.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {sellers.reduce((sum, seller) => sum + seller.products, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{sellers.reduce((sum, seller) => sum + seller.revenue, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Products Modal */}
      {showProductsModal && (
        <SellerProductsModal
          sellerId={selectedSellerId}
          onClose={() => setShowProductsModal(false)}
        />
      )}
    </div>
  );
};

export default AdminSellers;