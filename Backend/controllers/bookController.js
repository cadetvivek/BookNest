const Book = require('../models/Book');

// Get all books with search and filter
exports.getAllBooks = async (req, res) => {
    try {
        const { title, author, genre, availability } = req.query;
        const query = {};

        if (title) query.title = { $regex: title, $options: 'i' };
        if (author) query.author = { $regex: author, $options: 'i' };
        if (genre) query.genre = { $regex: genre, $options: 'i' };
        if (availability !== undefined) query.availability = availability === 'true';

        const books = await Book.find(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        isbn: req.body.isbn,
        description: req.body.description,
        image: req.body.image,
        pages: req.body.pages,
        status: req.body.status,
        rating: req.body.rating,
        notes: req.body.notes
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update only the fields that were provided in the request
        if (req.body.title !== undefined) book.title = req.body.title;
        if (req.body.author !== undefined) book.author = req.body.author;
        if (req.body.genre !== undefined) book.genre = req.body.genre;
        if (req.body.isbn !== undefined) book.isbn = req.body.isbn;
        if (req.body.description !== undefined) book.description = req.body.description;
        if (req.body.image !== undefined) book.image = req.body.image;
        if (req.body.pages !== undefined) book.pages = req.body.pages;
        if (req.body.status !== undefined) book.status = req.body.status;
        if (req.body.rating !== undefined) book.rating = req.body.rating;
        if (req.body.notes !== undefined) book.notes = req.body.notes;
        if (req.body.availability !== undefined) book.availability = req.body.availability;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
