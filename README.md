# BookNest - Modern Library Management System

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cadetvivek/BookNest/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-v18-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18-green.svg)](https://nodejs.org/)

BookNest is a modern, feature-rich library management system built with React and Node.js. It provides a seamless experience for managing books, users, and borrowing operations.

## 🚀 Features

- 📚 Comprehensive book management system
- 📖 Detailed book information and search functionality
- 📝 User authentication and authorization
- 🔄 Real-time book availability tracking
- 📱 Fully responsive design
- 🎨 Modern and intuitive user interface
- 📧 Contact form integration
- 📊 Admin dashboard for managing books and users

## 🛠️ Tech Stack

- **Frontend**:
  - React 18
  - React Router
  - Axios
  - CSS Modules
  - Font Awesome
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - CORS

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cadetvivek/BookNest.git
   cd BookNest
   ```

2. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd Frontend
   npm install
   ```

4. Create a `.env` file in the Backend directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```bash
   cd Backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd Frontend
   npm run dev
   ```

## 🎯 Project Structure

```
BookNest/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 📝 API Documentation

### Books API

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Users API

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `POST /api/users/borrow` - Borrow book

## 📱 Responsive Design

BookNest is fully responsive and works perfectly on all devices:
- Desktop
- Tablet
- Mobile

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- Special thanks to all contributors and users

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
