import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleReturnBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/users/return',
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh user data
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      setError('Failed to return book');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p className="role">Role: {user.role}</p>
        </div>
      </div>

      <div className="borrowed-books">
        <h2>Borrowed Books</h2>
        {user.borrowHistory?.length > 0 ? (
          <div className="books-list">
            {user.borrowHistory.map((borrow) => (
              <div key={borrow._id} className="borrowed-book">
                <div className="book-info">
                  <h3>{borrow.book.title}</h3>
                  <p>By {borrow.book.author}</p>
                  <p>Borrowed on: {new Date(borrow.borrowDate).toLocaleDateString()}</p>
                  {borrow.returnDate && (
                    <p>Returned on: {new Date(borrow.returnDate).toLocaleDateString()}</p>
                  )}
                </div>
                {borrow.status === 'borrowed' && (
                  <button
                    onClick={() => handleReturnBook(borrow.book._id)}
                    className="return-btn"
                  >
                    Return Book
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-books">You haven't borrowed any books yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile; 