import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      alert("Login successful");
      navigate('/shop');
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-pink-600 text-center">Login</h2>

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

        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-pink-600 font-semibold">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
