const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Test route
app.get("/", (req, res) => {
    res.send("Library Book Management API is running");
});

// POST API
app.post("/api/books", async (req, res) => {
    try {
        const { title, author, isbn, category, publicationYear } = req.body;

        // Validation
        if (!title || !author || !isbn || !category || !publicationYear) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Create book
        const newBook = new Book({
            title,
            author,
            isbn,
            category,
            publicationYear
        });

        // Save to MongoDB
        const savedBook = await newBook.save();

        // Send response
        res.status(201).json(savedBook);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});