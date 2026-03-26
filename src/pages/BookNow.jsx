import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const memberships = [
  { id: 'regular', label: 'Regular Membership', price: 250, type: 'core' },
  { id: 'vip', label: 'VIP Membership', price: 400, type: 'core' },
  { id: 'vvip', label: 'VVIP Membership', price: 500, type: 'core' },
  { id: 'meet', label: 'Meet & Greet', price: 1000, type: 'extra' },
  { id: 'live', label: 'Live Video Chat (per hour)', price: 300, type: 'extra' },
  { id: 'call', label: 'Private Call (Audio/per hour)', price: 200, type: 'extra' },
];

const MembershipPage = () => {
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSelect = (id) => {
    const isSelected = selected.includes(id);
    const clickedOption = memberships.find((m) => m.id === id);

    const coreSelected = selected.filter((sid) => {
      const option = memberships.find((m) => m.id === sid);
      return option?.type === 'core';
    });

    // Restrict multiple core selections
    if (
      !isSelected &&
      clickedOption.type === 'core' &&
      coreSelected.length > 0
    ) {
      const withoutPrevious = selected.filter(
        (sid) =>
          memberships.find((m) => m.id === sid)?.type !== 'core'
      );
      setSelected([...withoutPrevious, id]);
      return;
    }

    // Toggle selection
    setSelected((prev) =>
      isSelected ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setError('');
  };

  const handleSubmit = () => {
    if (selected.length === 0) {
      setError('Please select at least one membership option.');
      return;
    }

    const selectedItems = memberships.filter((m) => selected.includes(m.id));
    navigate('/payment', { state: { selectedItems } });
  };

  const selectedItems = memberships.filter((m) => selected.includes(m.id));
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">Booking Options</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 mb-4 rounded">
          {error}
        </div>
      )}

      <ul className="space-y-4">
        {memberships.map((option) => (
          <li
            key={option.id}
            className={`p-4 border rounded cursor-pointer ${
              selected.includes(option.id)
                ? 'bg-gray-100 border-black'
                : 'bg-white'
            }`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{option.label}</span>
              <span className="text-sm text-gray-700">${option.price}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary Section */}
      {selectedItems.length > 0 && (
        <div className="bg-gray-50 border border-gray-300 p-4 mt-6 rounded-lg">
          <h3 className="font-bold text-lg mb-3 text-black">Summary</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {selectedItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.label}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-black">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          {selectedItems.length > 2 && (
            <p className="text-sm text-green-600 mt-2">
              🎉 Combo selected — you may qualify for a surprise gift!
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Pay ${total || 0} Now
        </button>

        <button
          className="w-full border border-black text-black py-2 rounded hover:bg-gray-50"
          onClick={() => navigate('/shop')}
        >
          View Signed Merchandise
        </button>
      </div>
    </div>
  );
};

export default MembershipPage;
