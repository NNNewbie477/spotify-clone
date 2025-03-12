import mongoose from "mongoose";

// Define the user schema with required fields and a unique clerkId
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the User model based on the userSchema
export const User = mongoose.model("User", userSchema);
