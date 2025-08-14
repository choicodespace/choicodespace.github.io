// src/hooks/useCart.js
import { useEffect, useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [bounceCartIcon, setBounceCartIcon] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor}`;
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: itemId, // full unique id
          baseId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          selectedSize,
          selectedColor,
          quantity,
        },
      ]);
    }

    setBounceCartIcon(true);
    setTimeout(() => setBounceCartIcon(false), 500);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, clearCart, bounceCartIcon };
};
