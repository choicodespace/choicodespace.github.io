import React, { useState } from 'react';
import { FaBars, FaTimes, FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-pink-600 text-white shadow-md px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Shop Icon + Link */}
        <Link
          to="/shop"
          className="flex items-center gap-2 text-white hover:text-gray-200 font-medium"
        >
          <FaStore className="text-xl" />
          <span>Shop</span>
        </Link>

        {/* Logo / Title */}
        <h1 className="text-xl font-bold">CHOIDOT FAN SITE</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/top" className="hover:text-gray-300">Top</Link>
          <Link to="/book" className="hover:text-gray-300">Book Now</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-2 flex flex-col gap-4 bg-pink-800 p-4 rounded shadow-md"
        >
          <Link to="/" onClick={closeMenu} className="hover:text-gray-300">Home</Link>
          <Link to="/top" onClick={closeMenu} className="hover:text-gray-300">Top</Link>
          <Link to="/book" onClick={closeMenu} className="hover:text-gray-300">Book Now</Link>
          <Link to="/contact" onClick={closeMenu} className="hover:text-gray-300">Contact Us</Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default NavBar;
