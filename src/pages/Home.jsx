import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Learning with <span className="gradient-text">Smart Education</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered personalized education for the modern student
          </p>
          <p className="hero-description">
            Experience adaptive learning paths, real-time analytics, and intelligent
            content recommendations designed to maximize your potential.
          </p>
          <div className="hero-buttons">
            <Link to="/features" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="features-preview">
        <h2 className="section-title">Why Choose Smart Education?</h2>
        <p className="section-subtitle">
          Powerful features designed to accelerate your learning journey
        </p>
        <div className="features-grid">
          <div className="feature-preview-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3>Personalized Learning</h3>
            <p>Adaptive content tailored to your learning style and pace.</p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>AI-Powered Insights</h3>
            <p>Smart analytics that identify strengths and areas for growth.</p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 17V9M13 17V5M8 17v-3" />
              </svg>
            </div>
            <h3>Progress Tracking</h3>
            <p>Real-time dashboards to monitor your learning journey.</p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Secure Platform</h3>
            <p>Your data is protected with enterprise-grade security.</p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>Collaborative Learning</h3>
            <p>Connect with peers and mentors in real-time.</p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
            </div>
            <h3>Mobile First</h3>
            <p>Learn anywhere with our responsive mobile experience.</p>
          </div>
        </div>
        <div className="cta-center">
          <Link to="/features" className="btn btn-primary">
            View All Features
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">What Students Say</h2>
        <p className="section-subtitle">
          Trusted by thousands of learners worldwide
        </p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="testimonial-text">
              "The personalized recommendations have helped me focus on exactly what I need to learn."
            </p>
            <div className="testimonial-author">
              <strong>Priya Sharma</strong>
              <span>Engineering Student</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="testimonial-text">
              "Clean interface and powerful analytics. Best learning platform I've used."
            </p>
            <div className="testimonial-author">
              <strong>Rahul Verma</strong>
              <span>Medical Student</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="testimonial-text">
              "The AI insights helped identify gaps in my knowledge I didn't know existed."
            </p>
            <div className="testimonial-author">
              <strong>Anjali Patel</strong>
              <span>MBA Student</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Learning?</h2>
          <p>Join thousands of students achieving their goals with Smart Education</p>
          <Link to="/contact" className="btn btn-primary">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
