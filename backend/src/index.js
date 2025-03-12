import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer } from "http";
import cron from "node-cron";

import { initializeSocket } from "./lib/socket.js";

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

// Load environment variables from .env file
dotenv.config();

// Set the directory name to the current directory
const __dirname = path.resolve();
// Create an Express application instance
const app = express();
// Get the port number from the environment variables
const PORT = process.env.PORT;

// Create an HTTP server using the Express application
const httpServer = createServer(app);
// Initialize socket communication with the HTTP server
initializeSocket(httpServer);

// Middleware to enable CORS and set the origin and credentials
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to add authentication information to the request object
app.use(clerkMiddleware());
// Middleware to handle file uploads with specified options
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

// Schedule a cron job to run every hour to clean up temporary files
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

// Define routes for user-related operations
app.use("/api/users", userRoutes);
// Define routes for admin-related operations
app.use("/api/admin", adminRoutes);
// Define routes for authentication-related operations
app.use("/api/auth", authRoutes);
// Define routes for song-related operations
app.use("/api/songs", songRoutes);
// Define routes for album-related operations
app.use("/api/albums", albumRoutes);
// Define routes for statistics-related operations
app.use("/api/stats", statRoutes);

// Serve static files from the frontend build directory in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // Serve the index.html file for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Global error handler middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// Start the HTTP server on the specified port and connect to the database
httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
