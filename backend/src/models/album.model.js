import mongoose from "mongoose";

// Defines the schema for an album in the database, including required fields and a reference to songs
const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Exports the Album model, which is used to interact with the albums collection in the database
export const Album = mongoose.model("Album", albumSchema);
