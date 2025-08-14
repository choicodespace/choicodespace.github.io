// src/pages/NewsDetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const NewsDetailPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <p className="text-red-600 text-lg">Post not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-6 py-12 text-left">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-blue-800">{post.title}</h1>
        <p className="text-sm text-gray-500">Published on {new Date(post.date).toLocaleDateString()}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
        <Link to="/top" className="text-blue-600 underline mt-4 inline-block">← Back to Blog</Link>
      </div>
    </section>
  );
};

export default NewsDetailPage;
