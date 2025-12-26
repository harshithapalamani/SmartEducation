import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import StudyPlanner from './pages/StudyPlanner';
import Quizzes from './pages/Quizzes';
import Attendance from './pages/Attendance';
import Materials from './pages/Materials';
import './App.css';

function AppContent() {
  const location = useLocation();

  // Pages that should not show navbar/footer (internal dashboard pages)
  const internalPages = ['/dashboard', '/chatbot', '/study-planner', '/quizzes', '/attendance', '/materials'];
  const isInternalPage = internalPages.some(page => location.pathname.startsWith(page));

  return (
    <div className="app">
      {!isInternalPage && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/study-planner" element={<StudyPlanner />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/materials" element={<Materials />} />
        </Routes>
      </main>
      {!isInternalPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
