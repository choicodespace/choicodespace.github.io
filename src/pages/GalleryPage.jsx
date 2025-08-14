// src/pages/GalleryPage.jsx
import React from 'react';

const galleryItems = [
  { type: 'image', src: '/gallery/top1.jpg' },
  { type: 'image', src: '/gallery/top2.jpg' },
  { type: 'video', src: '/gallery/top-teaser.mp4' },
  { type: 'image', src: '/gallery/top3.jpg' },
];

const GalleryPage = () => {
  return (
    <section className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              {item.type === 'image' ? (
                <img src={item.src} alt={`gallery-${index}`} className="w-full h-64 object-cover" />
              ) : (
                <video
                  controls
                  className="w-full h-64 object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
