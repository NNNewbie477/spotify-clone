import mongoose from "mongoose";

// Function to connect to the MongoDB database using the URI provided in environment variables
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process with a failure code if connection fails
  }
};
