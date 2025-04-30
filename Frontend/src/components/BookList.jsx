import React from 'react';
import BookCard from './BookCard';
import '../styles/BookList.css';

const BookList = ({ books, onBookClick }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onClick={() => onBookClick(book)}
        />
      ))}
    </div>
  );
};

export default BookList; 