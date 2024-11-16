import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img3.jpg)` }}>
            <Header />
            <div className="flex flex-col flex-grow items-center justify-center bg-black bg-opacity-60 text-white px-6 sm:px-12 lg:px-24">
                <div className="max-w-2xl text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                        Unlock New Opportunities & Transform Your Experience
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 opacity-80">
                        Join our community to connect, learn, and grow. Discover a platform that empowers you to achieve more.
                    </p>
                    <Link
                        to="/login"
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-lg shadow-xl hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
