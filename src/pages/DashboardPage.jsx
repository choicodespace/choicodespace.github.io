import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) return null;

  return (
    <section className="min-h-screen bg-blue-50 px-4 py-12 text-center">
      <div className="bg-white max-w-lg mx-auto p-6 rounded shadow">
        <h1 className="text-3xl font-bold text-blue-800">Welcome, {userData.firstName}!</h1>
        <p className="mt-4 text-gray-700">Full Name: {userData.firstName} {userData.lastName}</p>
        <p className="text-gray-700">Phone Number: {userData.phone}</p>
        <p className="text-gray-700">Email: {userData.email}</p>
      </div>
    </section>
  );
};

export default Dashboard;
