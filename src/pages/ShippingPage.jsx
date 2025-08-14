import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase'; // ✅ Make sure this points to your correct Firebase setup
import { collection, addDoc } from 'firebase/firestore';

const ShippingPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading on mount
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate order number
    const orderNumber = `TOP-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 9000 + 1000)}`;

    // Estimate delivery range
    const deliveryStart = new Date();
    const deliveryEnd = new Date();
    deliveryStart.setDate(deliveryStart.getDate() + 3);
    deliveryEnd.setDate(deliveryEnd.getDate() + 5);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const deliveryRange = `${deliveryStart.toLocaleDateString(undefined, options)} - ${deliveryEnd.toLocaleDateString(undefined, options)}`;

    // Final data to send
    const shippingData = {
      ...form,
      orderNumber,
      deliveryRange,
      timestamp: new Date(),
    };

    try {
      // Save to Firestore
      await addDoc(collection(db, 'shippingOrders'), shippingData);

      toast.success(`Order No: ${orderNumber} submitted successfully.`);
      navigate('/thank-you', {
        state: { orderNumber, name: form.name, deliveryRange },
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit shipping info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial loader
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
          <span className="absolute inset-0 flex items-center justify-center text-pink-700 font-bold">T.O.P</span>
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">Shipping Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full bg-pink-100 border p-2 rounded" />
        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full bg-pink-100 border p-2 rounded" />
        <input name="address" placeholder="Address" onChange={handleChange} required className="w-full bg-pink-100 border p-2 rounded" />
        <input name="city" placeholder="City" onChange={handleChange} required className="w-full bg-pink-100 border p-2 rounded" />
        <input name="state" placeholder="State/Province" onChange={handleChange} required className="w-full bg-pink-100 border p-2 rounded" />
        <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required className="w-full bg-pink-100 border p-2 rounded" />
        <input name="country" placeholder="Country" onChange={handleChange} required className="w-full bg-pink-100 border p-2 rounded" />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-500'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
