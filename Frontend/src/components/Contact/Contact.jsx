import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-description">
              Have questions about LibraryOS? We're here to help! Reach out to us
              through any of the following methods or fill out the contact form.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-method-text">
                  <div className="contact-method-label">Visit Us</div>
                  <div className="contact-method-value">123 Library Street, Booktown, BK 12345</div>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-method-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-method-text">
                  <div className="contact-method-label">Call Us</div>
                  <div className="contact-method-value">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-method-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-method-text">
                  <div className="contact-method-label">Email Us</div>
                  <div className="contact-method-value">kushwahvivek805@gmail.com</div>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <h2 className="form-title">Contact Form</h2>
            <p className="form-description">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form action="https://getform.io/f/bnlqojmb" method="POST" className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;