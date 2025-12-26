import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Smart Education</span>
          </h1>
          <p className="hero-subtitle">
            Transform your learning journey with AI-powered personalized education
          </p>
          <p className="hero-description">
            A Swadeshi, AI-driven education ecosystem designed to deliver
            personalized learning experiences and empower students for the future.
          </p>
          <div className="hero-buttons">
            <Link to="/features" className="btn btn-primary">
              Explore Platform
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-animation">
          <div className="floating-card card-1">📚</div>
          <div className="floating-card card-2">🎓</div>
          <div className="floating-card card-3">💡</div>
          <div className="floating-card card-4">🚀</div>
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
            <div className="stat-label">Courses Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="features-preview">
        <h2 className="section-title">Why Choose Smart Education?</h2>
        <p className="section-subtitle">
          Experience the future of learning with our advanced features
        </p>
        <div className="features-grid">
          <div className="feature-preview-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Learning</h3>
            <p>
              Adaptive content recommendations tailored to your performance and
              learning style.
            </p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Analysis</h3>
            <p>
              Machine learning models analyze your patterns to identify strengths
              and improvement areas.
            </p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">📊</div>
            <h3>Performance Dashboard</h3>
            <p>
              Visual insights and analytics to track your progress in real-time.
            </p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Built with indigenous solutions ensuring complete data privacy and
              control.
            </p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">👥</div>
            <h3>Interactive Learning</h3>
            <p>
              Engage with peers and mentors through collaborative tools and forums.
            </p>
          </div>
          <div className="feature-preview-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Accessible</h3>
            <p>
              Learn anytime, anywhere with our responsive and mobile-first design.
            </p>
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
        <h2 className="section-title">What Our Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "This platform has completely transformed my learning experience. The
              AI recommendations are spot-on!"
            </p>
            <div className="testimonial-author">
              <strong>Priya Sharma</strong>
              <span>Engineering Student</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Amazing platform! The personalized dashboard helps me track my
              progress effectively."
            </p>
            <div className="testimonial-author">
              <strong>Rahul Verma</strong>
              <span>Medical Student</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Best online education platform I've used. The AI analysis really
              helps identify my weak areas."
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
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>
            Join thousands of students already transforming their future with Smart
            Education
          </p>
          <Link to="/contact" className="btn btn-large">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
