import React, { useState } from 'react';
import '../styles/UserProfile.css';

const UserProfile = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img 
          src={formData.profilePicture || '/default-avatar.png'} 
          alt="Profile" 
          className="profile-picture"
        />
        <h2>{formData.name}</h2>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture URL</label>
          <input
            type="url"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile; 