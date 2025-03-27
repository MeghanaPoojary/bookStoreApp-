import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

const SECRET_KEY = "your_secret_key"; // Move this to .env in production

// Sample Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    // Generate a JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
