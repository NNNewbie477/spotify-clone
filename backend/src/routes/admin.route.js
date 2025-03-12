import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

// Create an Express Router instance
const router = Router();

// Apply middleware to protect all routes and require admin privileges
router.use(protectRoute, requireAdmin);

// Route to check admin status
router.get("/check", checkAdmin);

// Route to create a new song
router.post("/songs", createSong);

// Route to delete a song by ID
router.delete("/songs/:id", deleteSong);

// Route to create a new album
router.post("/albums", createAlbum);

// Route to delete an album by ID
router.delete("/albums/:id", deleteAlbum);

// Export the router for use in other modules
export default router;
