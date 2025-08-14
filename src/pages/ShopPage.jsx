import React, { useState, useEffect } from 'react';
import { squidGameMerch } from '../data/squidGameMerch';
import ProductCard from '../components/ProductCard';
import ShopHeader from './ShopHeader';

// Shuffle helper
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const ShopPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update suggestions
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length > 0) {
        const filtered = squidGameMerch
          .filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) &&
              (category === 'All' ||
                item.category.toLowerCase() === category.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(delay);
  }, [search, category]);

  const handleSuggestionClick = (text) => {
    setSearch(text);
    setSuggestions([]);
  };

  const filteredProducts = squidGameMerch.filter((product) => {
    const categoryMatch =
      category === 'All' ||
      product.category?.toLowerCase() === category.toLowerCase();

    const searchTerm = search.toLowerCase();
    const searchMatch =
      search === '' ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm);

    return categoryMatch && searchMatch;
  });

  const shuffledProducts = shuffleArray(filteredProducts);

  return (
    <>
      <ShopHeader />
      <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">
        {/* ✅ Embedded search bar */}
        <div className="relative w-full md:w-2/3 mx-auto mb-10">
          <div className="flex border rounded-lg overflow-hidden shadow-md">
            {/* Category Dropdown */}
            

            {/* Search Input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 focus:outline-none"
            />
          </div>

          {/* 🔽 Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-t-0 rounded-b shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🛍️ Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center min-h-[300px]">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
                <span className="absolute inset-0 flex items-center justify-center text-pink-700 font-bold">T.O.P</span>
              </div>
            </div>
          ) : shuffledProducts.length > 0 ? (
            shuffledProducts.map((product) => (
              <ProductCard key={`${product.id}-${product.name}`} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products match your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
