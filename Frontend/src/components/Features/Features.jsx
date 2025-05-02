import React, { useEffect, useRef } from 'react';
import { BookOpen, Users, Brain, Search } from 'lucide-react';
import './Features.css';

const featuresData = [
  {
    icon: <BookOpen size={30} />,
    title: "Book Management",
    description: "Easily catalog, track, and manage your entire book collection with our intuitive interface. Add new books, update information, track availability, and manage reservations all in one place."
  },
  {
    icon: <Users size={30} />,
    title: "User & Role Management",
    description: "Create and manage different user types including admins, librarians, and readers. Define custom permissions and access levels to ensure the right people have the right access."
  },
  {
    icon: <Brain size={30} />,
    title: "AI-Powered Recommendations",
    description: "Our advanced AI algorithms analyze reading patterns and preferences to suggest personalized book recommendations for your users, increasing engagement and circulation."
  },
  {
    icon: <Search size={30} />,
    title: "Smart Search with NLP",
    description: "Natural Language Processing powers our smart search functionality, allowing users to find books using conversational queries and get more accurate, relevant results."
  }
];

const Features = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Our Features</h2>
          <p className="section-subtitle">
            Discover how our Library Management System can transform your operations with these powerful features
          </p>
        </div>

        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card" 
              ref={el => cardsRef.current[index] = el}
              style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;