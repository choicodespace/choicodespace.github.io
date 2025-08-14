// src/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-pink-800 mb-6">Your Cart</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-pink-700 font-bold">T.O.P</span>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-pink-700 mt-12">
          <FaShoppingCart className="text-6xl mb-4 text-pink-600" />
          <p className="text-xl font-semibold">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-300">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-pink-600 p-4 rounded shadow">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded" />
                  <div>
                    <h2 className="font-semibold text-white">{item.name}</h2>
                    <p className="text-sm text-white">
                      Size: {item.selectedSize}, Color: {item.selectedColor}
                    </p>
                    <p className="text-white">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="text-sm text-white hover:underline mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xl text-pink-800 font-bold">Total: ${total.toFixed(2)}</p>

            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-pink-500 px-4 py-2 rounded hover:bg-pink-300"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="bg-pink-800 text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
