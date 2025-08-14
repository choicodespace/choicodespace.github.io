import React, { useState, useEffect } from 'react';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useUser, useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const user = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.displayName || '',
        email: user.email || '',
      }));

      const loadExtraDetails = async () => {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setForm((prev) => ({
            ...prev,
            address: data.address || '',
            phone: data.phone || '',
          }));
        }
      };
      loadExtraDetails();
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const { fullName, email, address, phone, currentPassword, newPassword } = form;

      if (email !== user.email || currentPassword || newPassword) {
        if (!currentPassword) throw new Error("Current password required to update email or password");

        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        if (email !== user.email) {
          await updateEmail(user, email);
        }

        if (newPassword) {
          await updatePassword(user, newPassword);
        }
      }

      if (fullName !== user.displayName) {
        await updateProfile(user, { displayName: fullName });
      }

      await setDoc(doc(db, 'users', user.uid), {
        address,
        phone,
      }, { merge: true });

      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
      return;
    }

    const currentPassword = prompt("Please enter your current password to confirm:");
    if (!currentPassword || !user) return;

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);

      alert("Your account has been deleted.");
      logout();
      navigate('/');
    } catch (error) {
      alert("Failed to delete account: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
        <hr />
        <input
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Current Password (for email or password changes)"
          type="password"
          className="w-full p-2 border rounded"
        />
        <input
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          type="password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <hr className="my-6" />

      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete My Account
      </button>
    </div>
  );
};

export default Settings;
