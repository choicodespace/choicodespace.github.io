import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const ThankYouPage = () => {
  const { state } = useLocation();
  const name = state?.name || 'Customer';
  const orderNumber = state?.orderNumber || 'Unavailable';
  const deliveryRange = state?.deliveryRange || '3–5 business days';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <FaCheckCircle className="text-pink-600 text-5xl mb-4" />
      <h1 className="text-2xl text-pink-600 font-bold">Thank you, {name}!</h1>
      <p className="text-pink-700 mt-2">Your order has been confirmed.</p>
      <p className="mt-1 text-pink-800 font-semibold">Order Number: <span className="text-pink-800">{orderNumber}</span></p>
      <p className="mt-3 text-pink-600">Expected Delivery: <span className="text-pink-600">{deliveryRange}</span></p>
      <p className="mt-6 italic font-bold text-pink-800">— T.O.P Choi Management</p>
    </div>
  );
};

export default ThankYouPage;
