import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Award, Clock, TrendingUp, Calendar } from 'lucide-react';

const StudentDashboard = () => {
    const { user } = useAuth();

    const statsCards = [
        { title: 'Courses Enrolled', value: '4', icon: BookOpen },
        { title: 'Assignments Due', value: '3', icon: Calendar },
        { title: 'Average Grade', value: 'A-', icon: Award },
        { title: 'Study Hours', value: '24', icon: Clock }
    ];

    const myCourses = [
        { name: 'Mathematics 101', progress: 75, instructor: 'Dr. Smith' },
        { name: 'Physics Fundamentals', progress: 60, instructor: 'Prof. Johnson' },
        { name: 'Computer Science', progress: 90, instructor: 'Dr. Williams' },
        { name: 'English Literature', progress: 45, instructor: 'Ms. Davis' }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
                    <p className="mt-2 text-gray-400">Ready to learn something new today? Check out your progress below.</p>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AI Chatbot Card */}
                    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-semibold">AI Study Assistant</h2>
                        </div>
                        <p className="text-gray-300 mb-6">
                            Get instant help with your academic questions. Our AI chatbot is available 24/7 to assist you.
                        </p>
                        <Link
                            to="/student/chatbot"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Start Chat
                        </Link>
                    </div>

                    {/* My Courses */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
                            <BookOpen className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {myCourses.map((course, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="font-medium text-gray-900">{course.name}</p>
                                            <p className="text-sm text-gray-500">{course.instructor}</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-gray-700 to-gray-900 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Learning Tips */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-5 h-5 text-black" />
                        <h2 className="text-lg font-semibold text-gray-900">Learning Tips</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-900 mb-1">Use the AI Chatbot</p>
                            <p className="text-sm text-gray-600">Get instant answers to your academic questions anytime.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-900 mb-1">Stay Consistent</p>
                            <p className="text-sm text-gray-600">Study regularly to maintain good progress in all courses.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-900 mb-1">Ask Questions</p>
                            <p className="text-sm text-gray-600">Don't hesitate to seek help from teachers or the AI assistant.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
