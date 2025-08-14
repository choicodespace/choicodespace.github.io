import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmOrder = async () => {
    if (submitting || cart.length === 0) return;
    setSubmitting(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      await addDoc(collection(db, 'orders'), {
        userId: user?.uid || 'anonymous',
        email: user?.email || 'no-email',
        cart,
        total,
        createdAt: serverTimestamp(),
      });

      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to place order. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Checkout Summary</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-pink-700 font-bold">T.O.P</span>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div className="text-center py-20">
          <FaShoppingCart className="text-6xl text-pink-400 mx-auto mb-4" />
          <p className="text-lg text-pink-800 font-semibold">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block text-sm text-pink-700 underline hover:text-pink-900"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="bg-pink-600 p-5 shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-white">
                    Size: {item.selectedSize}, Color: {item.selectedColor}, Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <p className="text-xl text-pink-800 font-bold mb-2">Total: ${total.toFixed(2)}</p>

          <div className="flex justify-center">
            <button
              onClick={handleConfirmOrder}
              disabled={submitting}
              className={`mt-4 px-6 py-2 text-white rounded-xl ${
                submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-800 hover:bg-pink-600'
              }`}
            >
              {submitting ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
