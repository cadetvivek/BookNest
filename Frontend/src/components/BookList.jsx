import React, { useState } from 'react';
import BookCard from './BookCard';
import '../styles/BookList.css';

const BookList = ({ books, onBookClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(books.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="book-list-container">
      <div className="book-list">
        {currentBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onClick={() => onBookClick(book)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn prev-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="page-numbers">
            {getPageNumbers().map((number) => (
              <button
                key={number}
                className={`page-number ${currentPage === number ? 'active' : ''}`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn next-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList; 