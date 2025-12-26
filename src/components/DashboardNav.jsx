import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DashboardNav.css';

const DashboardNav = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const userRole = localStorage.getItem('userRole') || 'student';
    const userName = localStorage.getItem('userName') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const studentLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: 'home' },
        { path: '/chatbot', label: 'AI Assistant', icon: 'chat' },
        { path: '/study-planner', label: 'Study Planner', icon: 'calendar' },
        { path: '/quizzes', label: 'Quizzes', icon: 'quiz' },
        { path: '/attendance', label: 'Attendance', icon: 'attendance' },
        { path: '/materials', label: 'Materials', icon: 'materials' },
    ];

    const teacherLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: 'home' },
        { path: '/chatbot', label: 'AI Assistant', icon: 'chat' },
        { path: '/quizzes', label: 'Manage Quizzes', icon: 'quiz' },
        { path: '/attendance', label: 'Attendance', icon: 'attendance' },
        { path: '/materials', label: 'Course Materials', icon: 'materials' },
        { path: '/study-planner', label: 'Class Schedule', icon: 'calendar' },
    ];

    const navLinks = userRole === 'teacher' ? teacherLinks : studentLinks;

    const getIcon = (type) => {
        const icons = {
            home: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
            ),
            chat: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
            calendar: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            quiz: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
            ),
            attendance: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            materials: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            ),
        };
        return icons[type] || icons.home;
    };

    return (
        <>
            <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <Link to="/dashboard" className="sidebar-logo">
                        <div className="logo-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        </div>
                        {sidebarOpen && <span>SmartEdu</span>}
                    </Link>
                    <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {sidebarOpen ? (
                                <path d="M15 18l-6-6 6-6" />
                            ) : (
                                <path d="M9 18l6-6-6-6" />
                            )}
                        </svg>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        {sidebarOpen && <span className="nav-label">Menu</span>}
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{getIcon(link.icon)}</span>
                                {sidebarOpen && <span className="nav-text">{link.label}</span>}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className={`user-profile ${sidebarOpen ? '' : 'collapsed'}`}>
                        <div className={`user-avatar ${userRole}`}>
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        {sidebarOpen && (
                            <div className="user-info">
                                <span className="user-name">{userName}</span>
                                <span className="user-role">{userRole === 'teacher' ? 'Teacher' : 'Student'}</span>
                            </div>
                        )}
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16,17 21,12 16,7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            <header className="dashboard-topbar">
                <div className="topbar-left">
                    <button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div className="search-bar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <div className="topbar-right">
                    <button className="topbar-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="notification-badge">3</span>
                    </button>
                    <div className={`user-mini ${userRole}`}>
                        {userName.charAt(0).toUpperCase()}
                    </div>
                </div>
            </header>
        </>
    );
};

export default DashboardNav;
