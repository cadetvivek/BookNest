import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        // Get 3 random books for featured section
        const randomBooks = response.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setFeaturedBooks(randomBooks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch featured books');
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BookNest</h1>
          <p>Discover, borrow, and enjoy your favorite books</p>
          <Link to="/books" className="cta-button">
            Browse Books
          </Link>
        </div>
      </section>

      <section className="featured-books">
        <h2>Featured Books</h2>
        {loading ? (
          <div className="loading">Loading featured books...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="books-grid">
            {featuredBooks.map(book => (
              <div key={book._id} className="featured-book">
                <div className="book-image">
                  {book.image ? (
                    <img src={book.image} alt={book.title} />
                  ) : (
                    <div className="book-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">By {book.author}</p>
                  <Link to={`/books/${book._id}`} className="view-details">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="features">
        <div className="feature">
          <h3>Browse Collection</h3>
          <p>Explore our extensive collection of books across various genres</p>
        </div>
        <div className="feature">
          <h3>Easy Borrowing</h3>
          <p>Borrow books with just a few clicks and enjoy reading</p>
        </div>
        <div className="feature">
          <h3>Track History</h3>
          <p>Keep track of your borrowed books and reading history</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 