import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: 'Personalized Learning',
      description: 'AI-driven content recommendations tailored to your learning style and pace.',
      benefits: ['Adaptive difficulty levels', 'Custom study plans', 'Learning style analysis']
    },
    {
      title: 'Smart Analytics',
      description: 'Comprehensive dashboards that track your progress and identify areas for improvement.',
      benefits: ['Real-time progress tracking', 'Performance insights', 'Goal setting tools']
    },
    {
      title: 'Interactive Content',
      description: 'Engaging multimedia lessons with quizzes, videos, and hands-on exercises.',
      benefits: ['Video tutorials', 'Practice exercises', 'Interactive simulations']
    },
    {
      title: 'Expert Support',
      description: 'Access to mentors and community forums for guidance and collaboration.',
      benefits: ['24/7 mentor access', 'Peer discussions', 'Live Q&A sessions']
    }
  ];

  return (
    <div className="features-container">
      {/* Header */}
      <section className="features-header">
        <h1>Features</h1>
        <p>Everything you need for effective, personalized learning</p>
      </section>

      {/* Features Grid */}
      <section className="features-main">
        <div className="features-grid-detailed">
          {features.map((feature, index) => (
            <div key={index} className="feature-detailed-card">
              <div className="feature-detailed-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-benefits">
                <h4>Key Benefits</h4>
                <ul>
                  {feature.benefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="checkmark">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="16" height="16">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="tech-section">
        <h2>Powered by Modern Technology</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Machine Learning</h3>
            <p>Advanced AI algorithms</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
            </div>
            <h3>Cloud Native</h3>
            <p>Scalable infrastructure</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h3>Secure</h3>
            <p>Enterprise-grade security</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Real-time</h3>
            <p>Instant feedback</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="features-cta">
        <h2>Ready to Experience the Future of Learning?</h2>
        <p>Join thousands of students already transforming their education</p>
        <Link to="/contact" className="cta-button">Get Started Free</Link>
      </section>
    </div>
  );
};

export default Features;
