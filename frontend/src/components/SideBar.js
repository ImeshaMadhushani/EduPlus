import React from 'react';

const Sidebar = () => {
    return (
        <aside className="bg-primary text-background w-64 h-screen flex flex-col justify-between p-6">

            {/* Logo and User Profile */}
            <div>
                {/* Logo */}
              {/*   <div className="text-2xl font-bold text-white mb-6">
                    LMS Platform
                </div> */}

                {/* User Profile */}
                <div className="flex items-center space-x-4 mb-8">
                    <img
                        src="https://via.placeholder.com/40" // Replace with user's profile image URL
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border-2 border-secondary"
                    />
                    <div>
                        <h3 className="text-white font-semibold">John Doe</h3>
                        <p className="text-secondary text-sm">Student</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4">
                <a href="#dashboard" className="text-secondary hover:text-accent transition-colors">Dashboard</a>
                <a href="#courses" className="text-secondary hover:text-accent transition-colors">Courses</a>
                <a href="#assignments" className="text-secondary hover:text-accent transition-colors">Assignments</a>
                <a href="#grades" className="text-secondary hover:text-accent transition-colors">Grades</a>
                <a href="#messages" className="text-secondary hover:text-accent transition-colors">Messages</a>
                <a href="#settings" className="text-secondary hover:text-accent transition-colors">Settings</a>
            </nav>

            {/* Logout Button */}
            <div className="mt-6">
                <button className="w-full bg-accent text-white py-2 rounded-md hover:bg-opacity-90 transition">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
