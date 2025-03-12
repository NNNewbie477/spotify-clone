import { Router } from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

// Create a router instance for handling song-related routes
const router = Router();

// Route to get all songs, requires authentication and admin privileges
router.get("/", protectRoute, requireAdmin, getAllSongs);

// Route to get featured songs
router.get("/featured", getFeaturedSongs);

// Route to get songs made for the authenticated user
router.get("/made-for-you", getMadeForYouSongs);

// Route to get trending songs
router.get("/trending", getTrendingSongs);

// Export the router to be used in other parts of the application
export default router;
