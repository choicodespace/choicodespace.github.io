import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';
import { FaBitcoin, FaGift } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ADDRESSES = {
  bitcoin: 'bc1qk3gazvx0n6l6wtsc9v0fvhegvnnfuqh4w95cte',
  usdt: '0xc5e57212ceAFff1522bF266563CBbE0F6D3e6dbC',
  ethereum: '0xc5e57212ceAFff1522bF266563CBbE0F6D3e6dbC',
  tron: 'TPZHZJ6dJb9rBdFhNzGjEXhp2NBDufyxNv',
};

const giftCardEmail = 'your@email.com';

const OrderConfirmationPage = () => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [cryptoType, setCryptoType] = useState('bitcoin');
  const [giftCardType, setGiftCardType] = useState('Amazon');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [giftCardImage, setGiftCardImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getDeliveryRange = () => {
    const now = new Date();
    const addBusinessDays = (date, days) => {
      const result = new Date(date);
      let count = 0;
      while (count < days) {
        result.setDate(result.getDate() + 1);
        const day = result.getDay();
        if (day !== 0 && day !== 6) count++;
      }
      return result;
    };
    const minDate = addBusinessDays(now, 3);
    const maxDate = addBusinessDays(now, 5);
    return `${minDate.toDateString()} - ${maxDate.toDateString()}`;
  };

  const handleConfirm = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    if (paymentMethod === 'giftcard' && !giftCardCode && !giftCardImage) {
      toast.error('Gift card code or image is required.');
      return;
    }

    setLoading(true);
    toast.success(
      `Order confirmed. Confirmation number will be sent to your email.\nExpected delivery: ${getDeliveryRange()}`
    );
    clearCart();

    setTimeout(() => {
      setLoading(false);
      navigate('/shipping');
    }, 2000);
  };

  if (initialLoading) {
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

      {/* Order Summary */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Order</h2>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm border-b py-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Payment Method Selector */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Choose Payment Method</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setPaymentMethod('crypto')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              paymentMethod === 'crypto' ? 'bg-yellow-200' : 'bg-gray-100'
            }`}
          >
            <FaBitcoin /> Crypto
          </button>
          <button
            onClick={() => setPaymentMethod('giftcard')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              paymentMethod === 'giftcard' ? 'bg-yellow-200' : 'bg-gray-100'
            }`}
          >
            <FaGift /> Gift Card
          </button>
        </div>
      </div>

      {/* Payment Details */}
      {paymentMethod === 'crypto' ? (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h3 className="font-semibold mb-2">Send Crypto Payment</h3>
          <label className="block mb-2">Select Coin:</label>
          <select
            value={cryptoType}
            onChange={(e) => setCryptoType(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="usdt">USDT</option>
            <option value="ethereum">Ethereum</option>
            <option value="tron">Tron (TRC20)</option>
          </select>
          <p className="text-sm">
            Send <strong>${total.toFixed(2)}</strong> worth of{' '}
            {cryptoType.toUpperCase()} to:
          </p>
          <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-2">
            {ADDRESSES[cryptoType]}
          </p>
        </div>
      ) : (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h3 className="font-semibold mb-2">Submit Gift Card</h3>
          <label className="block mb-2">Select Card Type:</label>
          <select
            value={giftCardType}
            onChange={(e) => setGiftCardType(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option>Amazon</option>
            <option>Apple</option>
            <option>Razer Gold</option>
            <option>Sephora</option>
            <option>Steam</option>
            <option>American Express</option>
            <option>Xbox</option>
          </select>

          <p className="text-sm">
            Send code or image to: <strong>{giftCardEmail}</strong>
          </p>

          <input
            type="text"
            placeholder="Enter gift card code"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value)}
            className="w-full border p-2 rounded mt-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGiftCardImage(e.target.files[0])}
            className="mt-3"
          />
        </div>
      )}

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className={`w-full mt-4 py-2 rounded text-white font-semibold ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          'Confirm & Proceed'
        )}
      </button>
    </div>
  );
};

export default OrderConfirmationPage;
