import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  // Handles the authentication callback from an external service
  // Extracts user details from the request body and checks if the user already exists in the database
  // If the user does not exist, it creates a new user record
  // Responds with a success status if the operation completes successfully
  // Catches and logs any errors that occur during the process, then passes the error to the next middleware
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // signup
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
