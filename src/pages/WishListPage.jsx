import React, { useEffect, useState } from 'react';
import { useWishlist } from '../hooks/useWishList';
import { useCart } from '../hooks/useCart';
import { squidGameMerch } from '../data/squidGameMerch';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { cart } = useCart();
  const cartCount = cart.length;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const wishlistedProducts = squidGameMerch.filter((item) =>
    wishlist.includes(item.id)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
          <span className="absolute inset-0 flex items-center justify-center text-pink-700 font-bold">
            T.O.P
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl text-pink-800 font-bold mb-6">Your Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-pink-500 mt-12">
          <FaHeartBroken className="text-6xl mb-4 text-pink-600" />
          <p className="text-xl font-semibold">Your wishlist is empty.</p>
          <Link to="/shop" className="mt-4 bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-300">
            Add Some Favorites
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-6">
            <button
              onClick={clearWishlist}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-400"
            >
              Clear Wishlist
            </button>

            <Link to="/shop">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-400">
                Continue Shopping
              </button>
            </Link>

            <Link to="/cart">
              <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                Go to Cart {cartCount > 0 && `(${cartCount})`}
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
