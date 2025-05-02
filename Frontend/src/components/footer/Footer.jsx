import React from 'react';
import { Library, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import '../footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">
              <Library size={24} />
              <span>BookNest</span>
            </div>
            <p>
              Modern library management system designed to streamline operations and enhance user experience.
              Powered by cutting-edge technology to transform how libraries operate.
            </p>
          </div>

          <div className="footer-links-container">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links-container">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>123 Library Street, Booktown, BK 12345</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>info@libraryos.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} BookNest. All rights reserved.
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon">
              <Facebook size={18} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-icon">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;