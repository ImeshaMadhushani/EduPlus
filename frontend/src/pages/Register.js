import React, { useState } from 'react';
//import Header from '../components/Header';
//import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        address: '',
        phoneNo: '',
        role: 'student', // Default role as 'student'
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            setMessage(result.message || 'User registered successfully');
        } catch (error) {
            setMessage(error.message || 'Error registering user');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* <Header /> */}
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl lg:grid lg:grid-cols-2 gap-6">
                    {/* Image Column */}
                    <div className="hidden lg:block relative">
                        <img
                            src={`${process.env.PUBLIC_URL}/img1.png`} // Your image path here
                            alt="Register illustration"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-transparent opacity-75"></div>
                    </div>

                    {/* Form Column */}
                    <div className="p-6 sm:p-8 lg:p-12 flex justify-center items-center">
                        <div className="w-full max-w-md">
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Register</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="age"
                                    type="number"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="phoneNo"
                                    placeholder="Phone Number"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Register
                                </button>
                            </form>

                            {message && (
                                <p className="text-center text-red-500 mt-4">
                                    {message}
                                </p>
                            )}

                            <div className="text-center mt-4">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          {/*   <Footer /> */}
        </div>
    );
};

export default Register;
