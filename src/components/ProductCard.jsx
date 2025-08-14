import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ✅ Updated path
import { useWishlist } from '../hooks/useWishList';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [adding, setAdding] = useState(false);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.warning('Please select a size and color');
      return;
    }

    if (adding) return;
    setAdding(true);
    addToCart(product, selectedSize, selectedColor, 1);
    toast.success('Item added to cart!');
    setTimeout(() => setAdding(false), 100);
  };

  const handleWishlistClick = () => {
    toggleWishlist(product.id);
    const message = isWishlisted(product.id)
      ? 'Removed from wishlist'
      : 'Added to wishlist!';
    toast.info(message);
  };

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition relative flex flex-col h-full">
      {/* ❤️ Wishlist */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 text-xl z-10"
        title="Toggle Wishlist"
      >
        <FaHeart className={isWishlisted(product.id) ? 'text-red-500' : 'text-gray-400'} />
      </button>

      {/* 📦 Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-80 object-cover rounded mb-3"
        />
        <h3 className="text-lg text-pink-600 font-semibold">{product.name}</h3>
        <p className="text-pink-800 font-bold">${product.price.toFixed(2)}</p>
      </Link>

      {/* 🔘 Selectors */}
      <div className="mt-2 space-y-2">
        {product.sizes && product.sizes.length > 0 && (
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            {product.sizes.map((size, idx) => (
              <option key={idx} value={size}>{size}</option>
            ))}
          </select>
        )}
        {product.colors && product.colors.length > 0 && (
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            {product.colors.map((color, idx) => (
              <option key={idx} value={color}>{color}</option>
            ))}
          </select>
        )}
      </div>

      {/* 🛒 Add to Cart Button */}
      <div className="mt-auto pt-3">
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full text-sm py-2 px-3 rounded text-white ${
            adding ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-800 hover:bg-gray-800'
          }`}
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
