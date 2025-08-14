// src/pages/ShopListing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ShopListing = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-700 mb-10">
        Welcome to the T.O.P Shop
      </h1>

      <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto">
        {/* Merch Section */}
        <Link
          to="/shop/merch"
          className="group bg-pink-100 hover:bg-pink-200 transition rounded-lg p-6 shadow-md border border-pink-300 flex flex-col items-center text-center"
        >
          <h2 className="text-2xl font-bold text-pink-800 mb-2 group-hover:text-pink-900">
            Merch
          </h2>
          <p className="text-gray-700">
            Explore exclusive T.O.P-themed shirts, hoodies, caps, and fan collectibles.
          </p>
        </Link>

        {/* Tspot Section */}
        <Link
          to="/shop/tspot"
          className="group bg-pink-300 hover:bg-pink-400 transition rounded-lg p-6 shadow-md border border-pink-300 flex flex-col items-center text-center"
        >
          <h2 className="text-2xl font-bold text-pink-800 mb-2 group-hover:text-pink-900">
            Tspot
          </h2>
          <p className="text-gray-700">
            Dive into T.O.P’s personal picks — from art drops to rare accessories and curated picks.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ShopListing;
