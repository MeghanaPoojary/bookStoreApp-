import express from "express";
import Book from "../models/book.model.js"; // Ensure correct path
import authMiddleware from "../middleware/authMiddleware.js"; // Ensure correct path

const router = express.Router();

// Add a book
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, author, price } = req.body;
    const newBook = new Book({ title, author, price });
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error adding book" });
  }
});

// Get all books
router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

// Update a book
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Error updating book" });
  }
});

// Delete a book
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting book" });
  }
});

export default router; // ✅ Use `export default` instead of `module.exports`
