import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherManageStudents from './pages/TeacherManageStudents';
import TeacherMaterials from './pages/TeacherMaterials';
import StudentDashboard from './pages/StudentDashboard';
import StudentMaterials from './pages/StudentMaterials';
import AIDoubtSupport from './pages/AIDoubtSupport';
import Chatbot from './pages/Chatbot';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ManageUsers />
                            </ProtectedRoute>
                        }
                    />

                    {/* Teacher Routes */}
                    <Route
                        path="/teacher"
                        element={
                            <ProtectedRoute allowedRoles={['teacher']}>
                                <TeacherDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/teacher/materials"
                        element={
                            <ProtectedRoute allowedRoles={['teacher']}>
                                <TeacherMaterials />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/teacher/students"
                        element={
                            <ProtectedRoute allowedRoles={['teacher']}>
                                <TeacherManageStudents />
                            </ProtectedRoute>
                        }
                    />

                    {/* Student Routes */}
                    <Route
                        path="/student"
                        element={
                            <ProtectedRoute allowedRoles={['student']}>
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student/materials"
                        element={
                            <ProtectedRoute allowedRoles={['student']}>
                                <StudentMaterials />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student/doubt-support"
                        element={
                            <ProtectedRoute allowedRoles={['student']}>
                                <AIDoubtSupport />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student/chatbot"
                        element={
                            <ProtectedRoute allowedRoles={['student']}>
                                <Chatbot />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default Redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
