/**
 * Smart Waste Management System - Backend Server
 * Main entry point for the Express application
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ===================
// Middleware Setup
// ===================

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "http://your-domain.com"
        : "http://localhost:5173", // Vite default port
    credentials: true,
  }),
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===================
// Routes
// ===================

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Complaint routes
app.use("/api/complaints", complaintRoutes);

// 404 Not Found route
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===================
// Error Handling
// ===================

app.use(errorHandler);

// ===================
// Start Server
// ===================

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  Smart Waste Management System - Backend Server       ║
║  Server is running on http://localhost:${PORT}             ║
║  Environment: ${process.env.NODE_ENV || "development"}                    ║
╚════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
