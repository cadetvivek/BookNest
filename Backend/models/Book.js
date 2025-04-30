const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['To Read', 'Reading', 'Finished'],
        default: 'To Read'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
