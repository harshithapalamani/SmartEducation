import { useState } from 'react';
import DashboardNav from '../components/DashboardNav';
import './Materials.css';

function Materials() {
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const subjects = [
        { id: 'all', name: 'All Subjects', color: '#6366f1' },
        { id: 'math', name: 'Mathematics', color: '#6366f1' },
        { id: 'physics', name: 'Physics', color: '#06b6d4' },
        { id: 'cs', name: 'Computer Science', color: '#10b981' },
        { id: 'english', name: 'English', color: '#f59e0b' }
    ];

    const materials = [
        { id: 1, subject: 'math', title: 'Calculus Complete Guide', type: 'pdf', size: '4.2 MB', uploadedAt: 'Dec 20, 2024', downloads: 156 },
        { id: 2, subject: 'math', title: 'Linear Algebra Notes', type: 'pdf', size: '2.8 MB', uploadedAt: 'Dec 18, 2024', downloads: 89 },
        { id: 3, subject: 'physics', title: 'Quantum Mechanics Lecture', type: 'video', duration: '45 min', uploadedAt: 'Dec 19, 2024', views: 234 },
        { id: 4, subject: 'physics', title: 'Thermodynamics Formulas', type: 'pdf', size: '1.5 MB', uploadedAt: 'Dec 15, 2024', downloads: 178 },
        { id: 5, subject: 'cs', title: 'Data Structures Tutorial', type: 'video', duration: '1h 20min', uploadedAt: 'Dec 22, 2024', views: 312 },
        { id: 6, subject: 'cs', title: 'Algorithms Cheat Sheet', type: 'pdf', size: '3.1 MB', uploadedAt: 'Dec 21, 2024', downloads: 245 },
        { id: 7, subject: 'english', title: 'Essay Writing Guide', type: 'pdf', size: '1.8 MB', uploadedAt: 'Dec 17, 2024', downloads: 67 },
        { id: 8, subject: 'english', title: 'Grammar Masterclass', type: 'video', duration: '55 min', uploadedAt: 'Dec 14, 2024', views: 145 }
    ];

    const filteredMaterials = materials.filter(material => {
        const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
        const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSubject && matchesSearch;
    });

    const getSubjectColor = (subject) => {
        const sub = subjects.find(s => s.id === subject);
        return sub?.color || '#6366f1';
    };

    const getSubjectName = (subject) => {
        const sub = subjects.find(s => s.id === subject);
        return sub?.name || subject;
    };

    return (
        <div className="dashboard-layout">
            <DashboardNav />
            <main className="materials-main">
                <div className="materials-container">
                    <header className="materials-header">
                        <div className="header-content">
                            <h1>Course Materials</h1>
                            <p>Access all your study resources in one place</p>
                        </div>
                        <div className="header-actions">
                            <div className="search-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search materials..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="upload-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17,8 12,3 7,8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                Upload
                            </button>
                        </div>
                    </header>

                    {/* Subject Filter */}
                    <div className="subject-filter">
                        {subjects.map(subject => (
                            <button
                                key={subject.id}
                                className={`filter-btn ${selectedSubject === subject.id ? 'active' : ''}`}
                                onClick={() => setSelectedSubject(subject.id)}
                                style={{ '--btn-color': subject.color }}
                            >
                                {subject.name}
                                <span className="count">
                                    {subject.id === 'all' ? materials.length : materials.filter(m => m.subject === subject.id).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Results Info */}
                    <div className="results-info">
                        <span>{filteredMaterials.length} materials found</span>
                    </div>

                    {/* Materials Grid */}
                    <div className="materials-grid">
                        {filteredMaterials.map(material => (
                            <div key={material.id} className="material-card">
                                <div className="material-icon" style={{ background: `${getSubjectColor(material.subject)}15`, color: getSubjectColor(material.subject) }}>
                                    {material.type === 'pdf' ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14,2 14,8 20,8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="5,3 19,12 5,21" />
                                        </svg>
                                    )}
                                </div>
                                <div className="material-content">
                                    <span className="material-subject" style={{ color: getSubjectColor(material.subject) }}>
                                        {getSubjectName(material.subject)}
                                    </span>
                                    <h3>{material.title}</h3>
                                    <div className="material-meta">
                                        <span className="meta-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                {material.type === 'pdf' ? (
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                ) : (
                                                    <circle cx="12" cy="12" r="10" />
                                                )}
                                            </svg>
                                            {material.type === 'pdf' ? material.size : material.duration}
                                        </span>
                                        <span className="meta-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {material.uploadedAt}
                                        </span>
                                    </div>
                                </div>
                                <div className="material-actions">
                                    <button className={`action-btn ${material.type === 'pdf' ? 'download' : 'play'}`}>
                                        {material.type === 'pdf' ? (
                                            <>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7,10 12,15 17,10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                                Download
                                            </>
                                        ) : (
                                            <>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="5,3 19,12 5,21" />
                                                </svg>
                                                Watch
                                            </>
                                        )}
                                    </button>
                                    <span className="stats">
                                        {material.type === 'pdf' ? `${material.downloads} downloads` : `${material.views} views`}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredMaterials.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                    <polyline points="13,2 13,9 20,9" />
                                </svg>
                            </div>
                            <h3>No materials found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Materials;
