import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero */}
      <section className="about-hero">
        <h1>About Smart Education</h1>
        <p className="about-subtitle">
          Empowering learners with AI-powered personalized education
        </p>
      </section>

      {/* Mission */}
      <section className="about-section mission-section">
        <div className="section-content">
          <div className="content-split">
            <div className="content-text">
              <h2>Our Mission</h2>
              <p>
                To revolutionize education by leveraging artificial intelligence
                to create personalized learning experiences that adapt to each
                student's unique needs and learning style.
              </p>
              <p>
                We believe every student deserves access to quality education
                tailored to their individual strengths. Our platform bridges
                traditional education with modern technology.
              </p>
            </div>
            <div className="content-visual">
              <div className="visual-card">
                <h3>Our Goal</h3>
                <p>Transform learning for 1 million students through personalized AI education by 2030</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="about-section vision-section">
        <div className="section-content">
          <h2>Our Vision</h2>
          <p className="vision-lead">
            Building an inclusive and intelligent education system for the future
          </p>
          <div className="vision-grid">
            <div className="vision-card">
              <h3>Modern Technology</h3>
              <p>Built with cutting-edge AI and machine learning algorithms</p>
            </div>
            <div className="vision-card">
              <h3>Inclusive Education</h3>
              <p>Quality education accessible to students from all backgrounds</p>
            </div>
            <div className="vision-card">
              <h3>Future-Ready Skills</h3>
              <p>Equipping students with skills to thrive in the global economy</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-section how-section">
        <div className="section-content">
          <h2>How It Works</h2>
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Assessment</h3>
                <p>Initial tests evaluate your current knowledge and learning style</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Analysis</h3>
                <p>Our algorithms create a personalized learning path for you</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Adaptive Learning</h3>
                <p>Content adjusts based on your performance in real-time</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Continuous Growth</h3>
                <p>Regular feedback ensures constant improvement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section values-section">
        <div className="section-content">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>Pushing boundaries with cutting-edge technology</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Integrity</h3>
              <p>Transparency and ethics in everything we do</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Inclusivity</h3>
              <p>Education accessible to all, everywhere</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3>Excellence</h3>
              <p>Striving for the highest quality always</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="about-section impact-section">
        <div className="section-content">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="stat-number-large">10K+</div>
              <div className="stat-label-large">Students</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number-large">500+</div>
              <div className="stat-label-large">Courses</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number-large">50+</div>
              <div className="stat-label-large">Institutions</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number-large">95%</div>
              <div className="stat-label-large">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to Transform Your Learning?</h2>
        <p>Join thousands of students already achieving their goals</p>
        <Link to="/contact" className="cta-btn">Get Started</Link>
      </section>
    </div>
  );
};

export default About;
