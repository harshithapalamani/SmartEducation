import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    BookOpen,
    Users,
    Award,
    TrendingUp,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated && user) {
        const dashboardRoutes = {
            admin: '/admin',
            teacher: '/teacher',
            student: '/student'
        };
        return <Navigate to={dashboardRoutes[user.role]} replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userData = await login(email, password);
            const dashboardRoutes = {
                admin: '/admin',
                teacher: '/teacher',
                student: '/student'
            };
            navigate(dashboardRoutes[userData.role]);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const quickLogin = (role) => {
        const credentials = {
            admin: { email: 'admin@education.com', password: 'admin123' },
            teacher: { email: 'teacher@education.com', password: 'teacher123' },
            student: { email: 'student@education.com', password: 'student123' }
        };
        setEmail(credentials[role].email);
        setPassword(credentials[role].password);
        setSelectedRole(role);
    };

    const features = [
        { icon: BookOpen, text: 'Access 1000+ Courses' },
        { icon: Users, text: 'Learn from Expert Teachers' },
        { icon: Award, text: 'Earn Certificates' },
        { icon: TrendingUp, text: 'Track Your Progress' }
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
                    }}
                />

                <div className="relative z-10 flex flex-col justify-between p-12 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                            <BookOpen className="w-7 h-7 text-black" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">SmartEdu</h1>
                            <p className="text-sm text-gray-400">Learning Platform</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                                Unlock Your
                                <span className="block text-white">
                                    Learning Potential
                                </span>
                            </h2>
                            <p className="mt-4 text-lg text-gray-400 max-w-md">
                                Join thousands of students and teachers on the most advanced education platform. Learn, teach, and grow together.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/20"
                                >
                                    <feature.icon className="w-5 h-5 text-white" />
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-8">
                            <div>
                                <p className="text-3xl font-bold">50K+</p>
                                <p className="text-sm text-gray-400">Active Students</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">1000+</p>
                                <p className="text-sm text-gray-400">Courses</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">500+</p>
                                <p className="text-sm text-gray-400">Expert Teachers</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="flex items-start gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                alt="Student"
                                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                            />
                            <div>
                                <p className="text-sm text-gray-300 italic">
                                    "SmartEdu transformed my learning experience. The AI chatbot helps me understand complex topics instantly!"
                                </p>
                                <p className="mt-2 font-semibold">Sarah Johnson</p>
                                <p className="text-xs text-gray-400">Computer Science Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-md">
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-lg mb-4">
                            <BookOpen className="w-9 h-9 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">SmartEdu</h1>
                        <p className="text-gray-500">Learning Platform</p>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-black">Welcome Back!</h2>
                        <p className="text-gray-500 mt-2">Sign in to continue your learning journey</p>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm text-gray-500 text-center mb-3">Quick access demo accounts</p>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { role: 'admin', label: 'Admin' },
                                { role: 'teacher', label: 'Teacher' },
                                { role: 'student', label: 'Student' }
                            ].map((item) => (
                                <button
                                    key={item.role}
                                    onClick={() => quickLogin(item.role)}
                                    className={`relative p-3 rounded-xl text-sm font-medium transition-all border ${selectedRole === item.role ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white border-gray-700 shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`}
                                >
                                    {selectedRole === item.role && (
                                        <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" />
                                    )}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-50 text-gray-500">or sign in with email</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-xl flex items-center gap-3 text-gray-700">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-black mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-black placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-black mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-black placeholder:text-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                    />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <button type="button" className="text-sm text-black hover:text-gray-700 font-medium underline">
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 focus:ring-4 focus:ring-gray-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <button type="button" className="text-black hover:text-gray-700 font-semibold underline">
                                Contact Admin
                            </button>
                        </p>
                        <p className="mt-4 text-xs text-gray-400">
                            © 2024 SmartEdu. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
