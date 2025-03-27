import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import adminAuthRoutes from "./route/adminAuth.js";
import adminBookRoutes from "./route/adminBooks.js"; // Fix require issue

dotenv.config(); // Load .env

const app = express();
//app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend requests
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // Allow cookies & authentication headers
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI || "mongodb://127.0.0.1:27017/bookStore";

// Connect to MongoDB
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/admin/auth", adminAuthRoutes); // Use import instead of require
app.use("/admin/books", adminBookRoutes); // Use import instead of require

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
