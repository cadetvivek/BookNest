const express = require('express');
const router = express.Router();
const { register, login, getProfile, borrowBook, returnBook } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.post('/borrow', auth, borrowBook);
router.post('/return', auth, returnBook);

module.exports = router;
