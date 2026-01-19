import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Bell } from 'lucide-react';

const Navbar = ({ onMenuClick, isMobileMenuOpen }) => {
    const { user } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-64 z-10 border-b border-gray-200">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Page Title */}
                <div className="hidden lg:block">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Welcome back, {user?.name?.split(' ')[0]}!
                    </h2>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Role Badge */}
                    <span className="px-3 py-1 rounded-full text-sm font-medium capitalize bg-gray-100 text-gray-700">
                        {user?.role}
                    </span>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 text-gray-600 hover:text-gray-900 relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                </div>
                                <div className="px-4 py-3 text-sm text-gray-500">
                                    No new notifications
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
