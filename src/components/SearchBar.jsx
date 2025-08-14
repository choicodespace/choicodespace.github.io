// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';

const SearchBar = ({ filters, onFilterChange, allProducts }) => {
  const [search, setSearch] = useState(filters.search || '');
  const [category, setCategory] = useState(filters.category || 'All');
  const [suggestions, setSuggestions] = useState([]);

  const categories = ['All', 'hoodies', 'lonsleeve', 'hat', 't-shirts'];

  useEffect(() => {
    const delay = setTimeout(() => {
      onFilterChange({ search, category });

      if (search.length > 0) {
        const filtered = allProducts
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 5); // Limit to 5 suggestions

        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(delay);
  }, [search, category]);

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onFilterChange({ search: suggestion, category });
  };

  return (
    <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit sticky top-28 z-10">
      <h2 className="text-xl font-semibold mb-4">Search Products</h2>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="relative">
        <label className="block font-medium mb-1">Search</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full border px-3 py-2 rounded"
        />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border mt-1 rounded w-full z-50 shadow-md max-h-48 overflow-y-auto">
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSuggestionClick(item.name)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
