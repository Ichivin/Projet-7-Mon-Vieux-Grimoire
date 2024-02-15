const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: {
        type: Array,
        default: [
            {
                userId: { type: String },
                grade: { type: Number, min: 0, max: 5, required: true },
            },
        ],
    },
    averageRating: { type: Number, min: 0, max: 5, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
