import React, { useEffect, useState } from 'react';
import TopTop from '../assets/toptop.jpg';
import { FaInstagram, FaFacebook, FaTelegram } from 'react-icons/fa';

const TOPProfile = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="min-h-screen bg-white py-10 px-4">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-sm border border-gray-200">
        <div className="md:flex md:items-center gap-8 mb-10 border-b pb-6">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-64 mb-6 md:mb-0">
            <img
              src={TopTop}
              alt="T.O.P Profile"
              className="rounded w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">T.O.P 최승현</h1>
            <div className="flex items-center gap-2 text-lg">
              <a
                href="https://www.instagram.com/ttt?igsh=bnNqOGVmYjIzaHJr"
                className="flex items-center text-pink-600 gap-1 hover:text-pink-800 transition"
              >
                <FaInstagram />
                <span className="text-sm">@ttt</span>
              </a>
              <a
                href="https://www.facebook.com/share/19rv7u1UZp/?mibextid=wwXIfr"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
              >
                <FaFacebook />
                <span className="text-sm">@최승현 ttt</span>
              </a>

              <a
                href="https://t.me/topchoifanchannel"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
              >
                <FaTelegram />
                <span className="text-sm">T.O.P Fan Hub</span>
              </a>
            </div>
            <p className="text-sm text-gray-600">
              <strong>생일:</strong> 1987년 11월 4일
            </p>
            <p className="text-sm text-gray-600">
              <strong>데뷔:</strong> 2008년 디지털 싱글 앨범 'Turn it Up'
            </p>
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-10">
          <h2 className="text-center text-2xl font-bold text-gray-800 uppercase tracking-wide">
            Activities
          </h2>

          {/* Awards */}
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">수상내역</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li><strong>2015:</strong> Prudential Eye Awards – Visual Culture Award</li>
              <li><strong>2013:</strong> 18th BIFF – Asia Star Awards (Best New Actor)</li>
              <li>50th Savings Day – Commendation from Financial Services Commission</li>
              <li><strong>2011:</strong> 8th Max Movie Awards – Best New Actor</li>
              <li>47th Baeksang Arts Awards – Best New Actor (Film)</li>
              <li>47th Baeksang Arts Awards – Most Popular Actor (Film)</li>
              <li><strong>2010:</strong> 47th Grand Bell Awards – Hallyu Popularity Award</li>
              <li>3rd Style Icon Awards – New Style Icon (Actor)</li>
              <li>31st Blue Dragon Film Awards – Best New Actor, Popular Star Award</li>
            </ul>
          </section>

          {/* Filmography */}
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">활동내역</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li><strong>2024:</strong> Squid Game 2 – Role: Thanos</li>
              <li><strong>2016:</strong> Out of Control</li>
              <li><strong>2015:</strong> Secret Message – Lead: Woo-hyun</li>
              <li><strong>2014:</strong> Tazza: The Hidden Card – Lead: Ham Dae-gil</li>
              <li><strong>2013:</strong> Commitment – Lead: Ri Myung-hoon</li>
              <li><strong>2010:</strong> 71: Into the Fire – Lead: Oh Jang-beom</li>
              <li>Iris: The Movie – Lead: Vic</li>
              <li><strong>2009:</strong> 19-Nineteen – Lead: Seo Jung-hoon</li>
              <li>Iris – Lead: Vic</li>
              <li><strong>2007:</strong> I Am Sam – Lead: Chae Moo-shin</li>
            </ul>
          </section>

          {/* Music */}
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">음악</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li><strong>2013:</strong> DOOM DADA</li>
              <li><strong>2010:</strong> Turn It Up, Today, Oh Mom</li>
              <li><strong>2007:</strong> Pretending to Be Okay</li>
              <li><strong>2006:</strong> Big Boy</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TOPProfile;
