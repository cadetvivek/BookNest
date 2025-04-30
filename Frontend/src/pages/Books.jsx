import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="books-container">
      <h1>All Books</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="books-grid">
        {books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Books;