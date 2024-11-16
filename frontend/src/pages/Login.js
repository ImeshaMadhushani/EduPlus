import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user)); // Store the user data// Store the JWT token
                setMessage('Login successful!');

                // Check user type and redirect accordingly
                if (result.user && result.user.role === "student") {
                    navigate('/studashboard'); // Redirect to student dashboard
                } else if (result.user && result.user.role === "admin") {
                    navigate('/admin'); // Redirect to admin dashboard
                } else {
                    navigate('/instructor'); // Redirect to instructor dashboard
                }
            } else {
                setMessage(result.message || 'Error logging in');
            }
        } catch (error) {
            setMessage(error.message || 'Error logging in');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Column */}
                    <div className="relative hidden lg:block">
                        <img
                            src={`${process.env.PUBLIC_URL}/img2.png`}
                            alt="Login illustration"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-transparent opacity-75"></div>
                    </div>

                    {/* Form Column */}
                    <div className="p-12 sm:p-14">
                        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Login</h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        </form>

                        {message && (
                            <p className="text-center text-red-500 mt-6">
                                {message}
                            </p>
                        )}

                        <div className="text-center mt-8">
                            <p>
                                Don't have an account?{' '}
                                <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
