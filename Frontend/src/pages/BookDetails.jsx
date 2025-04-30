import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post(
        'http://localhost:3000/api/users/borrow',
        { bookId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsBorrowed(true);
      setBook(prev => ({ ...prev, availability: false }));
    } catch (err) {
      setError('Failed to borrow book');
    }
  };

  const handleReturn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post(
        'http://localhost:3000/api/users/return',
        { bookId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsBorrowed(false);
      setBook(prev => ({ ...prev, availability: true }));
    } catch (err) {
      setError('Failed to return book');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="not-found">Book not found</div>;

  return (
    <div className="book-details">
      <div className="book-header">
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
          <h1>{book.title}</h1>
          <p className="author">By {book.author}</p>
          <p className="genre">{book.genre}</p>
          <p className="isbn">ISBN: {book.isbn}</p>
          <div className="book-status">
            <span className={`status-badge ${book.availability ? 'available' : 'unavailable'}`}>
              {book.availability ? 'Available' : 'Unavailable'}
            </span>
          </div>
          {book.availability ? (
            <button onClick={handleBorrow} className="borrow-btn">
              Borrow Book
            </button>
          ) : (
            <button onClick={handleReturn} className="return-btn">
              Return Book
            </button>
          )}
        </div>
      </div>
      <div className="book-description">
        <h2>Description</h2>
        <p>{book.description}</p>
      </div>
      <div className="book-notes">
        <h2>Notes</h2>
        <p>{book.notes || 'No notes available'}</p>
      </div>
    </div>
  );
};

export default BookDetails; 