import React from 'react';

const Header = () => {
    return (
        <header className="bg-primary text-background shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-semibold text-white">
                    <a href="/" className="hover:text-accent">
                        LMS Platform
                    </a>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <a
                        href="#courses"
                        className="text-background hover:text-accent transition-colors"
                    >
                        Courses
                    </a>
                    <a
                        href="#about"
                        className="text-background hover:text-accent transition-colors"
                    >
                        About
                    </a>
                    <a
                        href="#contact"
                        className="text-background hover:text-accent transition-colors"
                    >
                        Contact
                    </a>
                </nav>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <a
                        href="/login"
                        className="bg-secondary text-text px-4 py-2 rounded-md hover:bg-accent transition-colors"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="bg-accent text-background px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                        Sign Up
                    </a>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button
                        className="text-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                        {/* Icon for mobile menu (e.g., a hamburger menu) */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
