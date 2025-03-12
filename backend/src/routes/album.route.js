import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

// Create an Express router instance
const router = Router();

// Define a route to handle GET requests for retrieving all albums
router.get("/", getAllAlbums);

// Define a route to handle GET requests for retrieving a specific album by ID
router.get("/:albumId", getAlbumById);

// Export the router for use in other parts of the application
export default router;
