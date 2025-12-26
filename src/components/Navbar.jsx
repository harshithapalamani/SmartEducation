import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          Smart Education
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/features" className={isActive('/features') ? 'active' : ''} onClick={closeMenu}>
              Features
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav-auth">
          <Link to="/login" className="btn-login">Log in</Link>
          <Link to="/login" className="btn-signup">Sign up</Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
