import mongoose from "mongoose";

// Defines the schema for messages with required fields for sender ID, receiver ID, and content, and timestamps for creation and update
const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true }, // Clerk user ID
    receiverId: { type: String, required: true }, // Clerk user ID
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Exports the Message model based on the message schema, allowing interaction with the messages collection in the database
export const Message = mongoose.model("Message", messageSchema);
