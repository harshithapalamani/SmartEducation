import { Link } from 'react-router-dom';
import DashboardNav from '../components/DashboardNav';
import './Dashboard.css';

function Dashboard() {
    const userRole = localStorage.getItem('userRole') || 'student';
    const userName = localStorage.getItem('userName') || 'User';

    const studentStats = [
        { label: 'Courses Enrolled', value: '8', icon: 'book', color: '#6366f1', change: '+2 this month' },
        { label: 'Quizzes Completed', value: '24', icon: 'quiz', color: '#10b981', change: '85% avg score' },
        { label: 'Study Hours', value: '156', icon: 'clock', color: '#f59e0b', change: '+12 this week' },
        { label: 'Attendance Rate', value: '94%', icon: 'check', color: '#06b6d4', change: 'Excellent' },
    ];

    const teacherStats = [
        { label: 'Active Students', value: '156', icon: 'users', color: '#10b981', change: '+12 this month' },
        { label: 'Courses Created', value: '8', icon: 'book', color: '#6366f1', change: '4 active' },
        { label: 'Quizzes Published', value: '32', icon: 'quiz', color: '#f59e0b', change: '5 pending' },
        { label: 'Avg Class Score', value: '78%', icon: 'chart', color: '#06b6d4', change: '+5% improvement' },
    ];

    const stats = userRole === 'teacher' ? teacherStats : studentStats;

    const recentActivity = [
        { type: 'quiz', title: 'Completed "Calculus Fundamentals" quiz', time: '2 hours ago', score: '85%' },
        { type: 'course', title: 'Enrolled in "Advanced Physics"', time: '5 hours ago' },
        { type: 'attendance', title: 'Marked present in Mathematics', time: 'Today, 9:00 AM' },
        { type: 'material', title: 'Downloaded "Data Structures Notes"', time: 'Yesterday' },
    ];

    const upcomingTasks = [
        { subject: 'Mathematics', task: 'Calculus Assignment Due', due: 'Tomorrow', priority: 'high' },
        { subject: 'Physics', task: 'Lab Report Submission', due: 'Dec 28', priority: 'medium' },
        { subject: 'Computer Science', task: 'Project Presentation', due: 'Dec 30', priority: 'high' },
    ];

    const getIcon = (type) => {
        const icons = {
            book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
            quiz: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
            clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
            check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>,
            users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
            chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>,
        };
        return icons[type] || icons.book;
    };

    return (
        <div className="dashboard-layout">
            <DashboardNav />

            <main className="dashboard-main">
                <div className="dashboard-content">
                    {/* Welcome Section */}
                    <section className="welcome-section">
                        <div className="welcome-text">
                            <h1>Welcome back, {userName}! 👋</h1>
                            <p>{userRole === 'teacher' ? 'Manage your classes and track student progress' : 'Continue your learning journey'}</p>
                        </div>
                        <div className="welcome-actions">
                            <Link to="/chatbot" className="action-btn primary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                Ask AI Assistant
                            </Link>
                            <Link to="/quizzes" className="action-btn secondary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 11l3 3L22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                                {userRole === 'teacher' ? 'Create Quiz' : 'Take Quiz'}
                            </Link>
                        </div>
                    </section>

                    {/* Stats Grid */}
                    <section className="stats-section">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card" style={{ '--stat-color': stat.color }}>
                                <div className="stat-icon">
                                    {getIcon(stat.icon)}
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                                <span className="stat-change">{stat.change}</span>
                            </div>
                        ))}
                    </section>

                    {/* Main Grid */}
                    <div className="dashboard-grid">
                        {/* Quick Access */}
                        <section className="card quick-access">
                            <h2>Quick Access</h2>
                            <div className="quick-links">
                                <Link to="/chatbot" className="quick-link">
                                    <div className="quick-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </div>
                                    <span>AI Chat</span>
                                </Link>
                                <Link to="/study-planner" className="quick-link">
                                    <div className="quick-icon" style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </div>
                                    <span>Planner</span>
                                </Link>
                                <Link to="/quizzes" className="quick-link">
                                    <div className="quick-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 11l3 3L22 4" />
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                        </svg>
                                    </div>
                                    <span>Quizzes</span>
                                </Link>
                                <Link to="/attendance" className="quick-link">
                                    <div className="quick-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <path d="M22 4L12 14.01l-3-3" />
                                        </svg>
                                    </div>
                                    <span>Attendance</span>
                                </Link>
                                <Link to="/materials" className="quick-link">
                                    <div className="quick-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14,2 14,8 20,8" />
                                        </svg>
                                    </div>
                                    <span>Materials</span>
                                </Link>
                            </div>
                        </section>

                        {/* Upcoming Tasks */}
                        <section className="card upcoming-tasks">
                            <div className="card-header">
                                <h2>Upcoming Tasks</h2>
                                <Link to="/study-planner" className="see-all">View All</Link>
                            </div>
                            <div className="tasks-list">
                                {upcomingTasks.map((task, index) => (
                                    <div key={index} className={`task-item priority-${task.priority}`}>
                                        <div className="task-info">
                                            <span className="task-subject">{task.subject}</span>
                                            <span className="task-title">{task.task}</span>
                                        </div>
                                        <div className="task-due">{task.due}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <section className="card recent-activity">
                            <div className="card-header">
                                <h2>Recent Activity</h2>
                            </div>
                            <div className="activity-list">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="activity-item">
                                        <div className={`activity-icon ${activity.type}`}>
                                            {activity.type === 'quiz' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /></svg>}
                                            {activity.type === 'course' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>}
                                            {activity.type === 'attendance' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /></svg>}
                                            {activity.type === 'material' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>}
                                        </div>
                                        <div className="activity-info">
                                            <span className="activity-title">{activity.title}</span>
                                            <span className="activity-time">{activity.time}</span>
                                        </div>
                                        {activity.score && <span className="activity-score">{activity.score}</span>}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Progress Chart Placeholder */}
                        <section className="card progress-chart">
                            <div className="card-header">
                                <h2>Weekly Progress</h2>
                            </div>
                            <div className="chart-placeholder">
                                <div className="chart-bars">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                        <div key={day} className="chart-bar-wrapper">
                                            <div className="chart-bar" style={{ height: `${30 + Math.random() * 60}%` }}></div>
                                            <span>{day}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="chart-legend">
                                    <span><i style={{ background: '#6366f1' }}></i> Study Hours</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
