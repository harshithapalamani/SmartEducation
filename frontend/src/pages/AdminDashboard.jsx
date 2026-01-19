import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { usersAPI } from '../services/api';
import { Users, GraduationCap, BookOpen, UserCog, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalAdmins: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await usersAPI.getStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users
        },
        {
            title: 'Students',
            value: stats.totalStudents,
            icon: GraduationCap
        },
        {
            title: 'Teachers',
            value: stats.totalTeachers,
            icon: BookOpen
        },
        {
            title: 'Admins',
            value: stats.totalAdmins,
            icon: UserCog
        }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Overview of your education platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? (
                                            <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
                                        ) : (
                                            card.value
                                        )}
                                    </p>
                                </div>
                                <div className="p-3 rounded-xl bg-gray-100">
                                    <card.icon className="w-6 h-6 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <a
                                href="/admin/users"
                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-sm">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Manage Users</p>
                                    <p className="text-sm text-gray-500">Add, edit or remove users</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <div className="p-2 bg-gray-700 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Platform Growing</p>
                                    <p className="text-sm text-gray-500">Active users increasing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Clock className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900">System initialized</p>
                                    <p className="text-xs text-gray-500">Platform is ready for use</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Users className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900">Default users created</p>
                                    <p className="text-xs text-gray-500">Admin, Teacher, Student accounts ready</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <GraduationCap className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900">AI Chatbot enabled</p>
                                    <p className="text-xs text-gray-500">Students can access academic support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
