import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

// Asynchronously retrieves and returns statistics about songs, albums, users, and unique artists
export const getStats = async (req, res, next) => {
  try {
    // Aggregates counts of songs, albums, users, and groups artists to find unique count
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    // Sends the aggregated statistics as a JSON response with status code 200
    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    // Passes any errors to the next middleware for error handling
    next(error);
  }
};
