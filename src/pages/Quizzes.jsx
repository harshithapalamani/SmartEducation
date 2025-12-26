import { useState } from 'react';
import DashboardNav from '../components/DashboardNav';
import './Quizzes.css';

function Quizzes() {
    const [activeView, setActiveView] = useState('available');
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const availableQuizzes = [
        { id: 1, subject: 'Mathematics', title: 'Calculus Fundamentals', questions: 15, duration: '30 min', difficulty: 'Medium', dueDate: 'Dec 20, 2024', color: '#6366f1' },
        { id: 2, subject: 'Physics', title: 'Mechanics & Motion', questions: 20, duration: '45 min', difficulty: 'Hard', dueDate: 'Dec 22, 2024', color: '#ef4444' },
        { id: 3, subject: 'Computer Science', title: 'Data Structures Basics', questions: 12, duration: '25 min', difficulty: 'Easy', dueDate: 'Dec 25, 2024', color: '#10b981' },
        { id: 4, subject: 'Chemistry', title: 'Organic Chemistry', questions: 18, duration: '40 min', difficulty: 'Hard', dueDate: 'Dec 28, 2024', color: '#f59e0b' }
    ];

    const completedQuizzes = [
        { id: 5, subject: 'Mathematics', title: 'Algebra Basics', score: 85, total: 100, date: 'Dec 10, 2024' },
        { id: 6, subject: 'Physics', title: 'Thermodynamics', score: 72, total: 100, date: 'Dec 8, 2024' },
        { id: 7, subject: 'English', title: 'Grammar Test', score: 92, total: 100, date: 'Dec 5, 2024' }
    ];

    const sampleQuestions = [
        { id: 1, question: 'What is the derivative of x²?', options: ['x', '2x', '2x²', 'x/2'], correct: 1 },
        { id: 2, question: 'What is the integral of 2x?', options: ['x²', 'x² + C', '2x²', '2x² + C'], correct: 1 },
        { id: 3, question: 'What is the limit of sin(x)/x as x approaches 0?', options: ['0', '1', 'undefined', 'infinity'], correct: 1 }
    ];

    const handleStartQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setShowResults(false);
    };

    const handleSelectAnswer = (questionId, optionIndex) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleNextQuestion = () => {
        if (currentQuestion < sampleQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        sampleQuestions.forEach(q => {
            if (selectedAnswers[q.id] === q.correct) correct++;
        });
        return Math.round((correct / sampleQuestions.length) * 100);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return '#10b981';
            case 'Medium': return '#f59e0b';
            case 'Hard': return '#ef4444';
            default: return '#6b7280';
        }
    };

    // Quiz Taking View
    if (selectedQuiz && !showResults) {
        const question = sampleQuestions[currentQuestion];
        return (
            <div className="dashboard-layout">
                <DashboardNav />
                <main className="quiz-taking-main">
                    <div className="quiz-taking-container">
                        <header className="quiz-taking-header">
                            <div className="quiz-info">
                                <span className="quiz-subject">{selectedQuiz.subject}</span>
                                <h1>{selectedQuiz.title}</h1>
                            </div>
                            <button className="exit-btn" onClick={() => setSelectedQuiz(null)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                                Exit
                            </button>
                        </header>

                        <div className="quiz-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}></div>
                            </div>
                            <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
                        </div>

                        <div className="question-card">
                            <h2>{question.question}</h2>
                            <div className="options-list">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`option-btn ${selectedAnswers[question.id] === index ? 'selected' : ''}`}
                                        onClick={() => handleSelectAnswer(question.id, index)}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                        <span className="option-text">{option}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="quiz-navigation">
                            <button className="nav-btn prev" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>
                            <button className="nav-btn next" onClick={handleNextQuestion} disabled={selectedAnswers[question.id] === undefined}>
                                {currentQuestion === sampleQuestions.length - 1 ? 'Submit' : 'Next'}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Results View
    if (showResults) {
        const score = calculateScore();
        return (
            <div className="dashboard-layout">
                <DashboardNav />
                <main className="quiz-results-main">
                    <div className="quiz-results-container">
                        <div className="results-card">
                            <div className={`score-circle ${score >= 70 ? 'pass' : 'fail'}`}>
                                <span className="score-value">{score}%</span>
                                <span className="score-label">{score >= 70 ? 'Passed!' : 'Try Again'}</span>
                            </div>
                            <h2>Quiz Completed!</h2>
                            <p className="quiz-title">{selectedQuiz.title}</p>

                            <div className="results-stats">
                                <div className="result-stat">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22,4 12,14.01 9,11.01" />
                                    </svg>
                                    <div>
                                        <strong>{sampleQuestions.filter(q => selectedAnswers[q.id] === q.correct).length}</strong>
                                        <span>Correct</span>
                                    </div>
                                </div>
                                <div className="result-stat">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9 9l6 6M15 9l-6 6" />
                                    </svg>
                                    <div>
                                        <strong>{sampleQuestions.filter(q => selectedAnswers[q.id] !== q.correct).length}</strong>
                                        <span>Wrong</span>
                                    </div>
                                </div>
                                <div className="result-stat">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12,6 12,12 16,14" />
                                    </svg>
                                    <div>
                                        <strong>12:45</strong>
                                        <span>Time</span>
                                    </div>
                                </div>
                            </div>

                            <div className="results-actions">
                                <button className="review-btn" onClick={() => setShowResults(false)}>Review Answers</button>
                                <button className="done-btn" onClick={() => setSelectedQuiz(null)}>Back to Quizzes</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Main Quizzes View
    return (
        <div className="dashboard-layout">
            <DashboardNav />
            <main className="quizzes-main">
                <div className="quizzes-container">
                    <header className="quizzes-header">
                        <div className="header-content">
                            <h1>Quiz Center</h1>
                            <p>Test your knowledge and track your progress</p>
                        </div>
                        <div className="quiz-stats-header">
                            <div className="stat-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22,4 12,14.01 9,11.01" />
                                </svg>
                                <span>12 Completed</span>
                            </div>
                            <div className="stat-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20V10M18 20V4M6 20v-4" />
                                </svg>
                                <span>Avg: 82%</span>
                            </div>
                        </div>
                    </header>

                    <div className="quizzes-tabs">
                        <button className={`tab ${activeView === 'available' ? 'active' : ''}`} onClick={() => setActiveView('available')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                            Available
                        </button>
                        <button className={`tab ${activeView === 'completed' ? 'active' : ''}`} onClick={() => setActiveView('completed')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22,4 12,14.01 9,11.01" />
                            </svg>
                            Completed
                        </button>
                    </div>

                    <div className="quizzes-content">
                        {activeView === 'available' && (
                            <div className="quizzes-grid">
                                {availableQuizzes.map(quiz => (
                                    <div key={quiz.id} className="quiz-card">
                                        <div className="quiz-card-header">
                                            <span className="subject-tag" style={{ background: `${quiz.color}20`, color: quiz.color }}>{quiz.subject}</span>
                                            <span className="difficulty-tag" style={{ color: getDifficultyColor(quiz.difficulty) }}>{quiz.difficulty}</span>
                                        </div>
                                        <h3>{quiz.title}</h3>
                                        <div className="quiz-meta">
                                            <div className="meta-item">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12,6 12,12 16,14" />
                                                </svg>
                                                {quiz.duration}
                                            </div>
                                            <div className="meta-item">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 11l3 3L22 4" />
                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                                </svg>
                                                {quiz.questions} Q
                                            </div>
                                        </div>
                                        <div className="quiz-card-footer">
                                            <span className="due-date">Due: {quiz.dueDate}</span>
                                            <button className="start-btn" onClick={() => handleStartQuiz(quiz)}>Start</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeView === 'completed' && (
                            <div className="completed-list">
                                {completedQuizzes.map(quiz => (
                                    <div key={quiz.id} className="completed-item">
                                        <div className="completed-info">
                                            <span className="subject-tag">{quiz.subject}</span>
                                            <h3>{quiz.title}</h3>
                                            <span className="completed-date">{quiz.date}</span>
                                        </div>
                                        <div className="completed-score">
                                            <div className={`score-badge ${quiz.score >= 70 ? 'pass' : 'fail'}`}>{quiz.score}%</div>
                                        </div>
                                        <button className="review-link">Review</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Quizzes;
