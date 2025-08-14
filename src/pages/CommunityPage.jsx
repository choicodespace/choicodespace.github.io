// src/pages/CommunityPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CommunityPage = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-12 text-center md:text-left">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold text-blue-800">Join the Fan Community</h1>
        <p className="text-gray-700 text-lg">
          Be part of the official T.O.P fan hub — connect with fellow VIPs, join community polls,
          submit fan art, and never miss an update.
        </p>

        <div className="bg-blue-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">Stay in the loop</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
            >
              Subscribe to Newsletter
            </button>
          </form>
        </div>

        <p className="text-sm text-gray-500">
          Want to contribute your fan art or stories? <Link to="/submit" className="underline text-blue-600">Click here</Link>.
        </p>
      </div>
    </section>
  );
};

export default CommunityPage;
