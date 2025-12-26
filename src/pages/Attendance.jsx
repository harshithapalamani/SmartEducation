import { useState } from 'react';
import DashboardNav from '../components/DashboardNav';
import './Attendance.css';

function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedSubject, setSelectedSubject] = useState('all');

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const subjects = [
        { id: 'math', name: 'Mathematics', color: '#6366f1' },
        { id: 'physics', name: 'Physics', color: '#06b6d4' },
        { id: 'cs', name: 'Computer Science', color: '#10b981' },
        { id: 'english', name: 'English', color: '#f59e0b' }
    ];

    const attendanceData = {
        math: { present: 28, absent: 2, total: 30 },
        physics: { present: 25, absent: 5, total: 30 },
        cs: { present: 29, absent: 1, total: 30 },
        english: { present: 27, absent: 3, total: 30 }
    };

    const recentAttendance = [
        { date: 'Dec 18, 2024', subject: 'Mathematics', status: 'present', time: '09:00 AM' },
        { date: 'Dec 18, 2024', subject: 'Physics', status: 'present', time: '11:00 AM' },
        { date: 'Dec 17, 2024', subject: 'Computer Science', status: 'present', time: '09:00 AM' },
        { date: 'Dec 17, 2024', subject: 'English', status: 'absent', time: '02:00 PM' },
        { date: 'Dec 16, 2024', subject: 'Mathematics', status: 'present', time: '09:00 AM' }
    ];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        return { daysInMonth, startingDay };
    };

    const { daysInMonth, startingDay } = getDaysInMonth(selectedMonth);

    const getAttendanceStatus = (day) => {
        const today = new Date();
        const checkDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
        if (checkDate > today) return 'future';
        if (checkDate.getDay() === 0 || checkDate.getDay() === 6) return 'weekend';
        const seed = day * 7;
        if (seed % 10 === 0) return 'absent';
        if (seed % 15 === 0) return 'late';
        return 'present';
    };

    const changeMonth = (delta) => {
        const newDate = new Date(selectedMonth);
        newDate.setMonth(newDate.getMonth() + delta);
        setSelectedMonth(newDate);
    };

    const calculateOverallAttendance = () => {
        let totalPresent = 0;
        let totalClasses = 0;
        Object.values(attendanceData).forEach(data => {
            totalPresent += data.present;
            totalClasses += data.total;
        });
        return Math.round((totalPresent / totalClasses) * 100);
    };

    return (
        <div className="dashboard-layout">
            <DashboardNav />
            <main className="attendance-main">
                <div className="attendance-container">
                    <header className="attendance-header">
                        <div className="header-content">
                            <h1>Attendance Manager</h1>
                            <p>Track your class attendance and stay on top</p>
                        </div>
                        <div className="overall-badge">
                            <div className="badge-circle">
                                <span className="badge-value">{calculateOverallAttendance()}%</span>
                            </div>
                            <span className="badge-label">Overall</span>
                        </div>
                    </header>

                    <div className="attendance-content">
                        <div className="attendance-left">
                            {/* Subject Cards */}
                            <div className="subject-cards">
                                {subjects.map(subject => {
                                    const data = attendanceData[subject.id];
                                    const percentage = Math.round((data.present / data.total) * 100);
                                    return (
                                        <div
                                            key={subject.id}
                                            className={`subject-card ${selectedSubject === subject.id ? 'active' : ''}`}
                                            onClick={() => setSelectedSubject(subject.id)}
                                        >
                                            <div className="subject-color" style={{ background: subject.color }}></div>
                                            <div className="subject-info">
                                                <div className="subject-header">
                                                    <span className="subject-name">{subject.name}</span>
                                                    <span className="subject-percent" style={{ color: subject.color }}>{percentage}%</span>
                                                </div>
                                                <div className="subject-bar">
                                                    <div className="bar-fill" style={{ width: `${percentage}%`, background: subject.color }}></div>
                                                </div>
                                                <div className="subject-stats">
                                                    <span className="stat">{data.present} Present</span>
                                                    <span className="stat absent">{data.absent} Absent</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Calendar */}
                            <div className="calendar-card">
                                <div className="calendar-header">
                                    <button className="nav-btn" onClick={() => changeMonth(-1)}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <h2>{months[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}</h2>
                                    <button className="nav-btn" onClick={() => changeMonth(1)}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="calendar-legend">
                                    <div className="legend-item"><span className="dot present"></span>Present</div>
                                    <div className="legend-item"><span className="dot absent"></span>Absent</div>
                                    <div className="legend-item"><span className="dot late"></span>Late</div>
                                    <div className="legend-item"><span className="dot weekend"></span>Weekend</div>
                                </div>

                                <div className="calendar-grid">
                                    {days.map(day => (
                                        <div key={day} className="calendar-day-header">{day}</div>
                                    ))}
                                    {Array.from({ length: startingDay }).map((_, i) => (
                                        <div key={`empty-${i}`} className="calendar-day empty"></div>
                                    ))}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const status = getAttendanceStatus(day);
                                        return (
                                            <div key={day} className={`calendar-day ${status}`}>
                                                <span>{day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="attendance-sidebar">
                            <div className="stats-card">
                                <h3>This Month</h3>
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <div className="stat-icon green">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22,4 12,14.01 9,11.01" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="stat-value">22</span>
                                            <span className="stat-label">Attended</span>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-icon red">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M15 9l-6 6M9 9l6 6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="stat-value">2</span>
                                            <span className="stat-label">Absences</span>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-icon yellow">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12,6 12,12 16,14" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="stat-value">1</span>
                                            <span className="stat-label">Late</span>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-icon purple">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 20V10M18 20V4M6 20v-4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="stat-value">92%</span>
                                            <span className="stat-label">Rate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="recent-card">
                                <h3>Recent Activity</h3>
                                <div className="recent-list">
                                    {recentAttendance.map((item, index) => (
                                        <div key={index} className="recent-item">
                                            <div className={`status-dot ${item.status}`}></div>
                                            <div className="recent-info">
                                                <span className="recent-subject">{item.subject}</span>
                                                <span className="recent-meta">{item.date}</span>
                                            </div>
                                            <span className={`status-tag ${item.status}`}>
                                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="alert-card">
                                <div className="alert-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                        <line x1="12" y1="9" x2="12" y2="13" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                </div>
                                <div className="alert-content">
                                    <h4>Attendance Warning</h4>
                                    <p>Physics attendance is below 85%. Attend next 3 classes to improve.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Attendance;
