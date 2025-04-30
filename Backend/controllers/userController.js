const User = require('../models/User');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const user = req.user;

        // Find the book
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if book is available
        if (!book.availability) {
            return res.status(400).json({ message: 'Book is currently not available' });
        }

        // Add to user's borrow history
        user.borrowHistory.push({
            book: bookId,
            borrowDate: new Date()
        });

        // Update book availability
        book.availability = false;
        book.save();

        await user.save();

        res.json({
            message: 'Book borrowed successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const user = req.user;

        // Find the book
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find the borrow record
        const borrowRecord = user.borrowHistory.find(b => b.book.toString() === bookId);
        if (!borrowRecord) {
            return res.status(400).json({ message: 'You have not borrowed this book' });
        }

        // Update book availability
        book.availability = true;
        book.save();

        // Remove from borrow history
        user.borrowHistory = user.borrowHistory.filter(b => b.book.toString() !== bookId);
        await user.save();

        res.json({
            message: 'Book returned successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
