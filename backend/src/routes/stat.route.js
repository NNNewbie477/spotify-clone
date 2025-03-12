import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

// Define a router for handling statistics-related routes
const router = Router();

// Set up a GET route for retrieving statistics, which requires protection and admin privileges
router.get("/", protectRoute, requireAdmin, getStats);

// Export the router to be used in other parts of the application
export default router;
