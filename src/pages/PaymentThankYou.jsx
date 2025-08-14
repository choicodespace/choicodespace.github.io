import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PaymentThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center px-4">
      <FaCheckCircle className="text-pink-600 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-pink-700 mb-2">Thank You for Your Payment</h1>
      <p className="text-gray-700 mb-4">
        Your payment details have been received successfully.
      </p>
      <p className="text-gray-600 mb-6">
        T.O.P Management appreciates your support. A confirmation email will be sent to you shortly.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentThankYou;
