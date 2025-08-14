import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChoiDot from '../assets/top.jpg';
import Footer from './Footer.jsx';

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyNews = [
      {
        title: 'T.O.P Teases Solo Album Release for 2025',
        url: '/top',
        publishedAt: '2025-07-01',
      },
      {
        title: 'Behind the Scenes of Squid Game Season 2 with T.O.P',
        url: '/top',
        publishedAt: '2025-06-28',
      },
      {
        title: 'T.O.P Opens Up About His Mental Health Journey',
        url: '/top',
        publishedAt: '2025-06-15',
      },
    ];
    setNews(dummyNews);

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-pink-700 font-bold">
            T.O.P
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <section className="flex flex-col md:flex-row flex-grow">
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-white shadow-xl">
          <div className="flex justify-center items-center h-auto md:h-screen md:sticky md:top-0 z-10">
            <img
              src={ChoiDot}
              alt="Choi Seung‑hyun (T.O.P)"
              className="w-full max-w-xs md:max-w-md rounded-xl border-4 border-white object-cover max-h-[75vh] md:max-h-screen"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto px-6 py-12 space-y-8 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
            Welcome to the <span className="text-pink-600">Official Fan Site</span><br />
            of <span className="text-purple-600">Choi Seung‑hyun (T.O.P)</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0">
            Dive into a world crafted especially for fans—where passion meets community.
            Explore exclusive interviews, behind‑the‑scenes photos, fan art, updates, and stories that celebrate the journey of T.O.P.
          </p>

          <article className="bg-white/70 backdrop-blur-lg rounded-lg p-4 border border-pink-800 shadow-lg">
            <h2 className="text-pink-600 font-semibold text-xl mb-2">About This Site</h2>
            <p className="text-gray-600">
              Curated by devoted fans, this is your trusted source for everything T.O.P—music, film, community, and more.
            </p>
          </article>

          <div className="sr-fade bg-pink-800 p-5 rounded-xl border-transparent border-white shadow-lg">
            <h2 className="text-white font-semibold text-xl mb-3">T.O.P Bio</h2>
            <ul className="text-white space-y-2">
              <li><strong>Real Name:</strong> Choi Seung-hyun</li>
              <li><strong>Born:</strong> November 4, 1987 (age 37)</li>
              <li><strong>Genres:</strong> K-pop, Hip-hop</li>
              <li><strong>Instruments:</strong> Vocals</li>
              <li><strong>Years Active:</strong> 2006–present</li>
              <li><strong>Formerly Of:</strong> BigBang, GD & TOP</li>
            </ul>
          </div>

          <div className="sr-fade bg-white p-5 rounded-xl border border-pink-800 shadow-lg">
            <h2 className="text-pink-800 font-semibold text-xl mb-3">Career Highlights</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Lead rapper of <strong>BigBang</strong> since 2006</li>
              <li>Solo singles: <em>Turn It Up</em>, <em>Doom Dada</em></li>
              <li>Award-winning actor in <em>71: Into the Fire</em>, <em>Commitment</em>, and <em>Squid Game S2</em></li>
              <li>Famous sub-unit: <strong>GD & TOP</strong></li>
              <li>Recognized for deep voice, artistic direction, and style</li>
            </ul>
          </div>

          <article className="sr-fade prose prose-blue prose-lg max-w-none text-white bg-pink-800 p-6 rounded-xl border border-blue-100 shadow">
            <h2 className='text-white font-bold'>Biography & Career Journey</h2>
            <p>
              <strong className='text-white font-bold'>Choi Seung-hyun</strong>, professionally known as <strong className='text-white font-bold'>T.O.P</strong>, is a celebrated South Korean rapper, songwriter, actor, and art collector.
              A former underground rapper known as “Tempo,” he rose to fame in 2006 after debuting with the globally influential boy group <strong className='text-white font-bold'>BigBang</strong>.
            </p>
            <p>
              With a deep, charismatic voice and a fiercely artistic style, T.O.P expanded into acting with critical success. His role in <em>71: Into the Fire</em>
              earned him several “Best New Actor” awards, and he later starred in hits like <em>Commitment</em> and <em>Squid Game</em> Season 2 (2024), where he played the fan-favorite character “Thanos.”
            </p>
            <p>
              Outside of music and acting, T.O.P is a passionate art enthusiast and philanthropist, curating exhibitions and contributing to various causes across Asia.
              His dedication to his craft, experimental sound, and bold personality has cemented his place as one of Korea’s most influential figures.
            </p>
          </article>

          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <Link to="/community" className="bg-pink-600 text-white px-6 py-2 rounded-full shadow hover:bg-pink-700 transition">
              Join the Community
            </Link>
            <Link to="/gallery" className="bg-pink-900 text-white px-6 py-2 rounded-full shadow hover:bg-pink-700 transition">
              Explore Gallery
            </Link>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-pink-800 mb-4">Latest News</h2>
            <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {news.map((item, index) => (
                <li
                  key={index}
                  className="p-3 bg-white rounded shadow hover:bg-gray-50 transition"
                >
                  <Link
                    to={item.url}
                    className="text-pink-700 font-medium"
                  >
                    {item.title}
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pb-10" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
