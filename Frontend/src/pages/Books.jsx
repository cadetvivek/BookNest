import { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import '../styles/Books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/books?title=${searchTerm}`);
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBookClick = (book) => {
    window.location.href = `/books/${book._id}`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="books-container">
      <h1 className="books-title">All Books</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} onBookClick={handleBookClick} />
    </div>
  );
}

export default Books;