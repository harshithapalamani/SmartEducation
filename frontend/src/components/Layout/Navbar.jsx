import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell } from 'lucide-react';

const Navbar = () => {
    const { user } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-10 h-16 border-b border-gray-200 bg-white shadow-sm lg:left-64">
            <div className="flex h-full items-center justify-between px-4 sm:px-6">
                {/* Page Title */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
                        Welcome back, {user?.name?.split(' ')[0]}!
                    </h2>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Role Badge */}
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700 sm:px-3 sm:text-sm">
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
