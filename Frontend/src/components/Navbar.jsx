

import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setIsAuthenticated(true);
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setMenuOpen(false); // Close menu when logging out
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Toggle body class for preventing background scrolling
    if (!menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Close menu when clicking on a link
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  return (
    <>
      {/* Dark overlay when mobile menu is open */}
      <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
      
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>BookNest</Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/books" onClick={closeMenu}>Books</Link>
          <Link to="/features" onClick={closeMenu}>Features</Link>
          <Link to="/pricing" onClick={closeMenu}>Pricing</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={closeMenu}>Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Login</Link>
              <Link to="/register" onClick={closeMenu}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;