import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <section className="min-h-screen bg-white px-6 py-12 text-center md:text-left">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-5xl font-bold text-pink-600">Contact Us</h1>
                <p className="text-pink-500 text-lg">
                    We would love to hear from you! Whether you have questions, suggestions, or just want to share your thoughts, feel free to reach out.
                </p>

                <div className="bg-pink-50 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3 text-pink-600">Get in Touch</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-pink-700 text-white px-6 py-2 rounded-full hover:bg-pink-800 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <p className="text-sm text-gray-500">
                    Need immediate access? <Link to="/book" className="underline text-blue-600">Book now</Link>.
                </p>
            </div>
        </section>
    );
}
export default ContactUs;