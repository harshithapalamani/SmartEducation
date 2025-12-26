import { useState } from 'react';
import DashboardNav from '../components/DashboardNav';
import './StudyPlanner.css';

function StudyPlanner() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('calendar');

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        return { daysInMonth, startingDay };
    };

    const { daysInMonth, startingDay } = getDaysInMonth(selectedDate);

    const studySessions = [
        { id: 1, subject: 'Mathematics', topic: 'Calculus - Integration', time: '09:00 AM', duration: '2 hours', color: '#6366f1' },
        { id: 2, subject: 'Physics', topic: 'Quantum Mechanics', time: '11:30 AM', duration: '1.5 hours', color: '#06b6d4' },
        { id: 3, subject: 'Computer Science', topic: 'Data Structures', time: '02:00 PM', duration: '2 hours', color: '#10b981' },
        { id: 4, subject: 'English', topic: 'Essay Writing', time: '04:30 PM', duration: '1 hour', color: '#f59e0b' }
    ];

    const weeklyGoals = [
        { id: 1, subject: 'Mathematics', target: 10, completed: 7, color: '#6366f1' },
        { id: 2, subject: 'Physics', target: 8, completed: 5, color: '#06b6d4' },
        { id: 3, subject: 'Computer Science', target: 12, completed: 9, color: '#10b981' },
        { id: 4, subject: 'English', target: 6, completed: 4, color: '#f59e0b' }
    ];

    const changeMonth = (delta) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setSelectedDate(newDate);
    };

    return (
        <div className="dashboard-layout">
            <DashboardNav />
            <main className="planner-main">
                <div className="planner-container">
                    <header className="planner-header">
                        <div className="header-content">
                            <h1>Study Planner</h1>
                            <p>Organize your study sessions and track your progress</p>
                        </div>
                        <button className="add-session-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Add Session
                        </button>
                    </header>

                    <div className="planner-tabs">
                        <button
                            className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
                            onClick={() => setActiveTab('calendar')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Calendar
                        </button>
                        <button
                            className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
                            onClick={() => setActiveTab('schedule')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                            </svg>
                            Schedule
                        </button>
                        <button
                            className={`tab ${activeTab === 'goals' ? 'active' : ''}`}
                            onClick={() => setActiveTab('goals')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                            </svg>
                            Goals
                        </button>
                    </div>

                    <div className="planner-content">
                        {activeTab === 'calendar' && (
                            <div className="calendar-section">
                                <div className="calendar-card">
                                    <div className="calendar-header">
                                        <button className="nav-btn" onClick={() => changeMonth(-1)}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 18l-6-6 6-6" />
                                            </svg>
                                        </button>
                                        <h2>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
                                        <button className="nav-btn" onClick={() => changeMonth(1)}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                        </button>
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
                                            const isToday = day === new Date().getDate() &&
                                                selectedDate.getMonth() === new Date().getMonth() &&
                                                selectedDate.getFullYear() === new Date().getFullYear();
                                            const hasEvents = [5, 8, 12, 15, 18, 22, 25].includes(day);

                                            return (
                                                <div
                                                    key={day}
                                                    className={`calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                                                >
                                                    <span>{day}</span>
                                                    {hasEvents && <div className="event-dot"></div>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="calendar-sidebar">
                                    <div className="upcoming-card">
                                        <h3>Today&apos;s Sessions</h3>
                                        <div className="session-list">
                                            {studySessions.map(session => (
                                                <div key={session.id} className="session-item">
                                                    <div className="session-color" style={{ background: session.color }}></div>
                                                    <div className="session-info">
                                                        <span className="session-subject">{session.subject}</span>
                                                        <h4>{session.topic}</h4>
                                                        <div className="session-meta">
                                                            <span>{session.time}</span>
                                                            <span className="dot">•</span>
                                                            <span>{session.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'schedule' && (
                            <div className="schedule-section">
                                <div className="timeline">
                                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => {
                                        const session = studySessions.find(s => s.time.includes(time.split(':')[0]));
                                        return (
                                            <div key={time} className="timeline-slot">
                                                <span className="time-label">{time}</span>
                                                <div className="slot-content">
                                                    {session && (
                                                        <div className="scheduled-session" style={{
                                                            background: `${session.color}15`,
                                                            borderLeftColor: session.color
                                                        }}>
                                                            <h4 style={{ color: session.color }}>{session.subject}</h4>
                                                            <p>{session.topic}</p>
                                                            <span className="session-duration">{session.duration}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="schedule-sidebar">
                                    <div className="tips-card">
                                        <h3>Study Tips</h3>
                                        <ul>
                                            <li>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22,4 12,14.01 9,11.01" />
                                                </svg>
                                                Take 5-min breaks every 25 minutes
                                            </li>
                                            <li>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22,4 12,14.01 9,11.01" />
                                                </svg>
                                                Stay hydrated during sessions
                                            </li>
                                            <li>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22,4 12,14.01 9,11.01" />
                                                </svg>
                                                Review notes before starting
                                            </li>
                                            <li>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22,4 12,14.01 9,11.01" />
                                                </svg>
                                                Eliminate distractions
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="progress-card">
                                        <h3>Today&apos;s Progress</h3>
                                        <div className="progress-stat">
                                            <span>Hours Studied</span>
                                            <strong>4.5 / 8</strong>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '56%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'goals' && (
                            <div className="goals-section">
                                <div className="goals-grid">
                                    {weeklyGoals.map(goal => (
                                        <div key={goal.id} className="goal-card">
                                            <div className="goal-header">
                                                <h3>{goal.subject}</h3>
                                                <span className="goal-badge" style={{ background: `${goal.color}20`, color: goal.color }}>
                                                    {Math.round((goal.completed / goal.target) * 100)}%
                                                </span>
                                            </div>
                                            <div className="goal-progress">
                                                <svg viewBox="0 0 36 36" className="goal-circle">
                                                    <path
                                                        className="circle-bg"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <path
                                                        className="circle-progress"
                                                        style={{ stroke: goal.color }}
                                                        strokeDasharray={`${(goal.completed / goal.target) * 100}, 100`}
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                </svg>
                                                <div className="goal-center">
                                                    <strong>{goal.completed}</strong>
                                                    <span>/ {goal.target} hrs</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="goals-summary">
                                    <h3>Weekly Summary</h3>
                                    <div className="summary-stats">
                                        <div className="summary-stat">
                                            <div className="stat-icon purple">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12,6 12,12 16,14" />
                                                </svg>
                                            </div>
                                            <div className="stat-info">
                                                <strong>25 hours</strong>
                                                <span>Total Study Time</span>
                                            </div>
                                        </div>
                                        <div className="summary-stat">
                                            <div className="stat-icon cyan">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 20V10" />
                                                    <path d="M18 20V4" />
                                                    <path d="M6 20v-4" />
                                                </svg>
                                            </div>
                                            <div className="stat-info">
                                                <strong>69%</strong>
                                                <span>Goals Completed</span>
                                            </div>
                                        </div>
                                        <div className="summary-stat">
                                            <div className="stat-icon green">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22,4 12,14.01 9,11.01" />
                                                </svg>
                                            </div>
                                            <div className="stat-info">
                                                <strong>18</strong>
                                                <span>Sessions Done</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StudyPlanner;
