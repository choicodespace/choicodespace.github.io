import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaHome, FaList } from 'react-icons/fa';

const ThankYouPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const name = state?.name || 'Customer';
  const orderNumber = state?.orderNumber || 'Unavailable';
  const deliveryRange = state?.deliveryRange || '3–5 business days';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-green-600 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You, {name}!</h1>
          <p className="text-gray-600 mb-4">Your order has been successfully confirmed.</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Order Number:</span>
            <span className="text-gray-800 font-semibold">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Expected Delivery:</span>
            <span className="text-gray-800 font-semibold">{deliveryRange}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/shop')}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            <FaShoppingBag />
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            <FaList />
            View My Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            <FaHome />
            Go to Home
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500 italic">
          — T.O.P Choi Management
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
