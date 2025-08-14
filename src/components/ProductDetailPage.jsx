import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { squidGameMerch } from '../data/squidGameMerch';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishList';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = squidGameMerch.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-500">Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Item added to cart!');
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
    toast.info(
      isWishlisted(product.id)
        ? 'Removed from wishlist.'
        : 'Added to wishlist.'
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Images Section */}
      <div>
        <img
          src={selectedImage}
          alt="Selected view"
          className="w-full max-h-[700px] object-contain rounded-xl"
        />
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Thumbnail"
              onClick={() => setSelectedImage(img)}
              className={`h-20 w-20 object-cover rounded-md border-2 cursor-pointer ${selectedImage === img ? 'border-black' : 'border-gray-200'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div>
        <h2 className="text-3xl text-pink-600 font-bold">{product.name}</h2>
        <p className="text-pink-800 text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>

        {/* Size Selector */}
        {product.sizes && (
          <div className="mt-4">
            <label className="font-medium text-pink-600">Size:</label>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selector */}
        {product.colors && (
          <div className="mt-4">
            <label className="font-medium text-pink-600">Color:</label>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? 'ring-2 ring-black' : ''
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mt-4">
          <label className="font-medium text-pink-600">Quantity:</label>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button onClick={handleAddToCart} className="bg-pink-800 text-white px-6 py-2 rounded-xl hover:bg-gray-900">
            Add to Cart
          </button>
          <button onClick={handleWishlistToggle} className="bg-gray-200 text-black px-6 py-2 rounded-xl hover:bg-pink-600">
            {isWishlisted(product.id) ? 'Remove Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
