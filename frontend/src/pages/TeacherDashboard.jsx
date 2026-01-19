import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, FileText, Award, GraduationCap, UserPlus, ArrowRight, TrendingUp } from 'lucide-react';

const TeacherDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalStudents: 0 });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await usersAPI.getStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const statsCards = [
        { title: 'My Courses', value: '5', icon: BookOpen },
        { title: 'Total Students', value: stats.totalStudents.toString(), icon: GraduationCap },
        { title: 'Classes Today', value: '3', icon: Calendar },
        { title: 'Hours Taught', value: '42', icon: Clock }
    ];

    const upcomingClasses = [
        { subject: 'Mathematics 101', time: '09:00 AM', students: 32 },
        { subject: 'Advanced Calculus', time: '11:30 AM', students: 24 },
        { subject: 'Statistics', time: '02:00 PM', students: 28 }
    ];

    const recentActivities = [
        { action: 'Graded assignment', subject: 'Math Quiz #5', time: '2 hours ago' },
        { action: 'Posted new material', subject: 'Chapter 7 Notes', time: '5 hours ago' },
        { action: 'Responded to doubt', subject: 'Student question', time: 'Yesterday' }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
                    <p className="mt-2 text-gray-400">You have 3 classes scheduled for today. Keep inspiring your students!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-gray-100">
                                    <card.icon className="w-6 h-6 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upcoming Classes */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {upcomingClasses.map((cls, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">{cls.subject}</p>
                                            <p className="text-sm text-gray-500">{cls.students} students enrolled</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                                        {cls.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Manage Students Card */}
                    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-semibold">Student Management</h2>
                        </div>
                        <p className="text-gray-300 mb-6">
                            Add new students to the platform or manage existing student accounts. As a teacher, you can create student credentials.
                        </p>
                        <Link
                            to="/teacher/students"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
                        >
                            <UserPlus className="w-5 h-5" />
                            Manage Students
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3 p-3">
                                    <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                                        <Award className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-sm text-gray-500">{activity.subject}</p>
                                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                            <TrendingUp className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-3">
                            <Link
                                to="/teacher/students"
                                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                            >
                                <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-sm">
                                    <UserPlus className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Add New Student</p>
                                    <p className="text-sm text-gray-500">Create student accounts</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                            </Link>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-gray-700 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Course Materials</p>
                                    <p className="text-sm text-gray-500">Coming in Phase 2</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-gray-500 rounded-lg">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Grade Assignments</p>
                                    <p className="text-sm text-gray-500">Coming in Phase 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeacherDashboard;
