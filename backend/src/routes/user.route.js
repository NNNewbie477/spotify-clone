import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";

// Create a router instance for handling user-related routes
const router = Router();

// Define a route to get all users, protected by authentication middleware
router.get("/", protectRoute, getAllUsers);

// Define a route to get messages for a specific user, protected by authentication middleware
router.get("/messages/:userId", protectRoute, getMessages);

// Export the router to be used in other parts of the application
export default router;
