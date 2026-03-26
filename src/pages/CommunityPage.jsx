// src/pages/CommunityPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CommunityPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    membershipType: 'basic'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-white px-6 py-12 text-center md:text-left">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold text-black">Join the Fan Community</h1>
        <p className="text-gray-700 text-lg">
          Be part of the official T.O.P fan hub — connect with fellow VIPs, join community polls,
          submit fan art, and never miss an update.
        </p>

        {!submitted ? (
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3 text-black">Become a Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Membership Type</label>
                <select
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="basic">Basic - Free</option>
                  <option value="premium">Premium - $9.99/month</option>
                  <option value="vip">VIP - $19.99/month</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Join Membership
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-green-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3 text-green-800">Welcome to the Community!</h2>
            <p className="text-green-700">
              Thank you for joining, {formData.name}! You'll receive a confirmation email at {formData.email} soon.
            </p>
            <Link to="/" className="text-black underline mt-4 inline-block">Back to Home</Link>
          </div>
        )}

        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-black">Membership Benefits</h2>
          <ul className="text-gray-700 space-y-2">
            <li>Exclusive access to behind-the-scenes content</li>
            <li>Early access to album releases and merch</li>
            <li>Community forums and fan discussions</li>
            <li>Monthly newsletters with updates</li>
            <li>Chance to submit fan art and stories</li>
          </ul>
        </div>

        <p className="text-sm text-gray-500">
          Want to contribute your fan art or stories? <Link to="/contact" className="underline text-black">Click here</Link>.
        </p>
      </div>
    </section>
  );
};

export default CommunityPage;
