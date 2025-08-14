import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-pink-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-pink-400 mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;