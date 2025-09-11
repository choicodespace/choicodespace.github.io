// src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaBitcoin, FaGift } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Modal, Button, Box, Typography } from '@mui/material';

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
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [orderStatus, setOrderStatus] = useState('Pending');
  const navigate = useNavigate();
  const location = useLocation();
  const countdownRef = useRef(null);
  const orderIdRef = useRef(null);

  // Use cart from context or navigation state
  const orderCart = location.state?.cart || cart;
  const total = location.state?.total || orderCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showModal && countdown > 0 && orderStatus !== 'Approved') {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdownRef.current);
  }, [showModal, orderStatus]);

  useEffect(() => {
    if (orderStatus === 'Approved') {
      clearInterval(countdownRef.current);
      toast.success('Payment approved! Email notification sent.');
    } else if (countdown === 0) {
      clearInterval(countdownRef.current);
    }
  }, [orderStatus, countdown]);

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

  const handleConfirm = async () => {
    if (orderCart.length === 0) {
      toast.error('Your cart is empty.');
      navigate('/shop');
      return;
    }

    if (paymentMethod === 'giftcard' && !giftCardCode && !giftCardImage) {
      toast.error('Gift card code or image is required.');
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Save payment details to Firestore
      const paymentDetails = {
        userId: user?.uid || 'anonymous',
        email: user?.email || 'no-email',
        paymentMethod,
        ...(paymentMethod === 'crypto' ? { cryptoType } : { giftCardType, giftCardCode }),
        total,
        createdAt: new Date().toISOString(),
        status: 'Pending',
      };

      const paymentRef = doc(collection(db, 'payments'));
      await setDoc(paymentRef, paymentDetails);
      orderIdRef.current = paymentRef.id;

      // Listen for status updates
      const unsubscribe = onSnapshot(doc(db, 'payments', paymentRef.id), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setOrderStatus(data.status);
          if (data.status === 'Approved') {
            // Simulate email notification
            console.log(`Email sent to ${user?.email || 'no-email'}: Payment approved for order ${paymentRef.id}`);
            toast.success('Payment approved! Email notification sent.');
          }
        }
      });

      setShowModal(true);
      toast.success(
        `Order submitted. Waiting for payment confirmation.\nExpected delivery: ${getDeliveryRange()}`
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('Failed to submit payment. Try again.');
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    clearCart();
    navigate('/shipping');
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

      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Order</h2>
        {orderCart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {orderCart.map((item) => (
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

      <Modal open={showModal} onClose={() => {}}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Waiting for Payment Confirmation
          </Typography>
          <Typography>
            Time remaining: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
          </Typography>
          {orderStatus === 'Approved' ? (
            <Typography color="green" mt={2}>
              Payment approved! You can proceed now.
            </Typography>
          ) : countdown === 0 ? (
            <Typography color="orange" mt={2}>
              Time expired. You can still proceed.
            </Typography>
          ) : (
            <Typography mt={2}>Waiting for admin approval...</Typography>
          )}
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Continue
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderConfirmationPage;