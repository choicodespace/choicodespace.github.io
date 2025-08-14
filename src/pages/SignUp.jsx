import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const navigate = useNavigate();
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
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, {
        displayName: form.fullName,
      });
      alert("Registration successful");
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-pink-600 text-center">Create Account</h2>

        <div className="flex items-center border rounded px-3 py-2">
          <FaUser className="text-pink-400 mr-2" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full outline-none"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded px-3 py-2">
          <FaEnvelope className="text-pink-400 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded px-3 py-2">
          <FaLock className="text-pink-400 mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full outline-none"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded px-3 py-2">
          <FaLock className="text-pink-400 mr-2" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full outline-none"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account? <a href="/login" className="text-pink-600 font-semibold">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
