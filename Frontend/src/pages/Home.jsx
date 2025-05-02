import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0
  });
  const slideInterval = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await axios.get('http://localhost:3000/api/books');
        console.log('Response received:', booksResponse.data);
        
        if (booksResponse.data && Array.isArray(booksResponse.data)) {
          // Get 6 random books for featured section
          const randomBooks = booksResponse.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setFeaturedBooks(randomBooks);

          // Calculate statistics
          const totalBooks = booksResponse.data.length;
          const availableBooks = booksResponse.data.filter(book => book.availability).length;
          const borrowedBooks = totalBooks - availableBooks;

          setStats({
            totalBooks,
            availableBooks,
            borrowedBooks
          });
        } else {
          throw new Error('Invalid response format from server');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Auto slide every 5 seconds
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.ceil(featuredBooks.length / 3));
    }, 5000);

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [featuredBooks.length]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + Math.ceil(featuredBooks.length / 3)) % Math.ceil(featuredBooks.length / 3));
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(featuredBooks.length / 3));
      }, 5000);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % Math.ceil(featuredBooks.length / 3));
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(featuredBooks.length / 3));
      }, 5000);
    }
  };

  const getVisibleBooks = () => {
    const start = currentSlide * 3;
    return featuredBooks.slice(start, start + 3);
  };

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to BookNest</h1>
            <p className="hero-subtitle">Discover, borrow, and enjoy your favorite books</p>
            <Link to="/books" className="btn btn-primary">
              Browse Books
            </Link>
          </div>
          <div className="hero-image-container">
            <img 
              src="https://thumbs.dreamstime.com/b/library-books-background-book-closet-filled-41199253.jpg" 
              alt="Library" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <section className="featured-books">
        <h2>Featured Books</h2>
        {loading ? (
          <div className="loading">Loading featured books...</div>
        ) : error ? (
          <div className="error">
            {error}
            <p>Please check your internet connection and try again.</p>
          </div>
        ) : (
          <div className="featured-books-container">
            <button className="slide-btn prev-btn" onClick={handlePrevSlide}>
              ←
            </button>
            <div className="books-slider">
              <div 
                className="books-slide" 
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
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
            </div>
            <button className="slide-btn next-btn" onClick={handleNextSlide}>
              →
            </button>
          </div>
        )}
      </section>

      <section className="features">
        <div className="feature">
          <h3>Browse Collection</h3>
          <p>Explore our collection of {stats.totalBooks} books across various genres</p>
          <Link to="/books" className="feature-link">View All Books</Link>
        </div>
        <div className="feature">
          <h3>Easy Borrowing</h3>
          <p>{stats.availableBooks} books available for borrowing</p>
          <Link to="/books" className="feature-link">Borrow Now</Link>
        </div>
        <div className="feature">
          <h3>Track History</h3>
          <p>{stats.borrowedBooks} books currently borrowed</p>
          <Link to="/profile" className="feature-link">View Your History</Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 