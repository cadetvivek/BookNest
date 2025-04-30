import { Link } from 'react-router-dom';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
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
        <p className="genre">{book.genre}</p>
        <div className="book-status">
          <span className={`status-badge ${book.availability ? 'available' : 'unavailable'}`}>
            {book.availability ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <Link to={`/books/${book._id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard; 