import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

// Define a router object using Express Router
const router = Router();

// Set up a POST route for '/callback' that uses the authCallback function from the controller
router.post("/callback", authCallback);

// Export the router object as the default export
export default router;
