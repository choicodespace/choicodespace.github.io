import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">
          {/* Copyright */}
          <p className="text-sm">&copy; {new Date().getFullYear()} ChoiDot Fan Site. All rights reserved.</p>

          {/* Divider on small screens */}
          <div className="block md:hidden border-t border-blue-700 my-2" />

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-3">
            <Link to="/" className="text-sm hover:text-blue-300 transition">Home</Link>
            <Link to="/top" className="text-sm hover:text-blue-300 transition">Top</Link>
            <Link to="/book" className="text-sm hover:text-blue-300 transition">Book Now</Link>
            <Link to="/contact" className="text-sm hover:text-blue-300 transition">Contact Us</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
