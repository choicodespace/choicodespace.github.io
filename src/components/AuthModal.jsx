// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthModal = ({ onClose }) => {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tab === 'register') {
      if (form.password !== form.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        const user = userCredential.user;

        // ✅ Update display name
        await updateProfile(user, {
          displayName: form.fullName,
        });

        // ✅ Reload user to update auth context with displayName
        await user.reload();

        onClose();
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        onClose();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <motion.div
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        exit={{ y: '-100vh' }}
        className="bg-white w-full max-w-md p-6 rounded shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 text-lg"
        >
          &times;
        </button>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`px-4 py-2 ${
              tab === 'login' ? 'bg-pink-600 text-white' : 'bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab('register')}
            className={`px-4 py-2 ${
              tab === 'register' ? 'bg-pink-600 text-white' : 'bg-gray-200'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div className="flex items-center border px-3 py-2 rounded">
              <FaUser className="text-pink-400 mr-2" />
              <input
                name="fullName"
                placeholder="Full Name"
                required
                value={form.fullName}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          )}

          <div className="flex items-center border px-3 py-2 rounded">
            <FaEnvelope className="text-pink-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border px-3 py-2 rounded">
            <FaLock className="text-pink-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          {tab === 'register' && (
            <div className="flex items-center border px-3 py-2 rounded">
              <FaLock className="text-pink-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            {tab === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthModal;
