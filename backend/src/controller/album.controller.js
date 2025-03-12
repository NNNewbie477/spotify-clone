import { Album } from "../models/album.model.js";

// Retrieves all albums from the database and sends them as a JSON response
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

// Retrieves an album by its ID, populates its songs, and sends it as a JSON response
// If the album is not found, sends a 404 error response
export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};
