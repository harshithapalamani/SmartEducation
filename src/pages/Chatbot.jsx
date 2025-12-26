import { useState, useRef, useEffect } from 'react';
import DashboardNav from '../components/DashboardNav';
import './Chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: 'Hello! I\'m your AI study assistant. I can help you with homework questions, explain concepts, provide study tips, and more. What would you like to learn about today?',
            time: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const suggestedQuestions = [
        'Explain photosynthesis',
        'Help with quadratic equations',
        'Tips for essay writing',
        'Summarize World War II'
    ];

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: text.trim(),
            time: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponses = [
                "That's a great question! Let me explain this concept in detail...",
                "I'd be happy to help you understand this topic better. Here's what you need to know...",
                "Good thinking! This is an important concept. Let me break it down for you...",
                "Excellent question! Here's a comprehensive explanation that should help..."
            ];

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: botResponses[Math.floor(Math.random() * botResponses.length)],
                time: new Date()
            };

            setIsTyping(false);
            setMessages(prev => [...prev, botMessage]);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const clearChat = () => {
        setMessages([{
            id: 1,
            type: 'bot',
            text: 'Hello! I\'m your AI study assistant. I can help you with homework questions, explain concepts, provide study tips, and more. What would you like to learn about today?',
            time: new Date()
        }]);
    };

    return (
        <div className="dashboard-layout">
            <DashboardNav />
            <main className="chatbot-main">
                <div className="chatbot-container">
                    <header className="chat-header">
                        <div className="bot-info">
                            <div className="bot-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </div>
                            <div className="bot-details">
                                <h1>AI Study Assistant</h1>
                                <span className="status">
                                    <span className="status-dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button className="clear-btn" onClick={clearChat} title="Clear chat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </button>
                    </header>

                    <div className="messages-area">
                        <div className="messages-list">
                            {messages.map((message) => (
                                <div key={message.id} className={`message ${message.type}`}>
                                    {message.type === 'bot' && (
                                        <div className="message-avatar">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="message-bubble">
                                        <p>{message.text}</p>
                                        <span className="message-time">{formatTime(message.time)}</span>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="message bot">
                                    <div className="message-avatar">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                        </svg>
                                    </div>
                                    <div className="message-bubble typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length === 1 && (
                            <div className="suggestions">
                                <p>Try asking:</p>
                                <div className="suggestion-chips">
                                    {suggestedQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            className="suggestion-chip"
                                            onClick={() => handleSend(question)}
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="chat-input-area">
                        <div className="input-wrapper">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything about your studies..."
                                rows="1"
                            />
                            <button
                                className="send-btn"
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </div>
                        <p className="input-hint">Press Enter to send, Shift + Enter for new line</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Chatbot;
