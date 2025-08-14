// ShopHeader.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHeart,
  FaShoppingBag,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import ChoiDotLogo from '../assets/choigotlogo.jpg';
import { useAuth } from '../context/AuthContext.jsx';
import AuthModal from '../components/AuthModal';

const ShopHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [bounceCartIcon, setBounceCartIcon] = useState(false);
  const [bounceWishlistIcon, setBounceWishlistIcon] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

      if (updatedCart.length !== cart.length) {
        setCart(updatedCart);
        setBounceCartIcon(true);
        setTimeout(() => setBounceCartIcon(false), 600);
      }

      if (updatedWishlist.length !== wishlist.length) {
        setWishlist(updatedWishlist);
        setBounceWishlistIcon(true);
        setTimeout(() => setBounceWishlistIcon(false), 600);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [cart.length, wishlist.length]);

  const handleProfileClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/shop');
  };

  const getColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-pink-600 flex justify-between items-center px-6 py-4 shadow-md">
        <div className="flex items-center gap-4 text-white">
          <Link to="/">
            <img src={ChoiDotLogo} alt="T.O.P Choi Logo" className="h-10 w-auto rounded" />
          </Link>
          <p className="uppercase font-bold text-xl">pink shop</p>
        </div>

        <div className="relative flex items-center gap-4 text-white">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <FaShoppingBag
              className={`text-xl transition-transform ${bounceCartIcon ? 'animate-bounce' : ''}`}
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-300 text-black font-bold text-xs px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative">
            <FaHeart
              className={`text-xl transition-transform ${bounceWishlistIcon ? 'animate-bounce' : ''}`}
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Icon / Avatar */}
          <div
            onClick={handleProfileClick}
            title={user?.displayName || user?.email || 'User Menu'}
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer font-bold text-white shadow"
            style={{
              backgroundColor: user ? getColorFromString(user.uid || user.email) : 'transparent',
              fontSize: '1rem',
            }}
          >
            {user ? getUserInitials() : <FaUserCircle className="text-3xl" />}
          </div>

          {/* Dropdown Menu */}
          {user && menuOpen && (
            <div className="absolute right-0 top-14 bg-white rounded shadow-lg w-48 py-2 z-50">
              <Link to="/settings" className="flex items-center text-pink-600 px-4 py-2 text-sm hover:bg-gray-100">
                <FaCog className="mr-2 text-pink-600" /> My Account
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-red-100 text-red-600"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default ShopHeader;
