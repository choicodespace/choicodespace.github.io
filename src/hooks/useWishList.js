// src/hooks/useWishlist.js
import { useState, useEffect } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  const clearWishlist = () => {
    setWishlist([]);
  };

  return { wishlist, toggleWishlist, isWishlisted, clearWishlist };
};
