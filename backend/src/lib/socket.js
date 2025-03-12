import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

// Initializes socket.io server and sets up event listeners for user connection, activity updates, message sending, and disconnection.
export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSockets = new Map(); // Maps user IDs to their corresponding socket IDs.
  const userActivities = new Map(); // Maps user IDs to their current activity status.

  // Event listener for when a new user connects to the socket.
  io.on("connection", (socket) => {
    // Event listener for when a user sends their user ID upon connection.
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // Notifies all connected users that a new user has connected.
      io.emit("user_connected", userId);

      // Sends the list of currently online users to the newly connected user.
      socket.emit("users_online", Array.from(userSockets.keys()));

      // Sends the current activities of all users to the newly connected user.
      io.emit("activities", Array.from(userActivities.entries()));
    });

    // Event listener for when a user updates their activity status.
    socket.on("update_activity", ({ userId, activity }) => {
      console.log("activity updated", userId, activity);
      userActivities.set(userId, activity);
      // Notifies all connected users about the updated activity status.
      io.emit("activity_updated", { userId, activity });
    });

    // Event listener for when a user sends a message.
    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        // Creates a new message in the database.
        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        // Sends the message to the receiver in real-time if they are online.
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        // Confirms to the sender that the message has been sent.
        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Message error:", error);
        // Sends an error message back to the sender if there was an issue.
        socket.emit("message_error", error.message);
      }
    });

    // Event listener for when a user disconnects from the socket.
    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        // Identifies the user who disconnected and cleans up their data.
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        // Notifies all connected users that this user has disconnected.
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
