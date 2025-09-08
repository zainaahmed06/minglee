// Server endpoint for generating Stream Chat tokens - example implementation
// This would be deployed to your backend service

const streamChat = require("stream-chat");

// Initialize Stream Chat client
const serverClient = streamChat.StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

/**
 * Generate a Stream Chat token for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.generateStreamToken = async (req, res) => {
  try {
    const {userId} = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Generate a token for the user
    const token = serverClient.createToken(userId);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate token",
    });
  }
};

/**
 * Create a Stream Chat user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createStreamUser = async (req, res) => {
  try {
    const {userId, name, imageUrl} = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: "User ID and name are required",
      });
    }

    // Create or update the user
    await serverClient.upsertUser({
      id: userId,
      name,
      image: imageUrl,
    });

    return res.status(200).json({
      success: true,
      message: "User created/updated successfully",
    });
  } catch (error) {
    console.error("Error creating/updating Stream user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create/update user",
    });
  }
};

/**
 * Delete a Stream Chat user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteStreamUser = async (req, res) => {
  try {
    const {userId} = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Delete the user
    await serverClient.deleteUser(userId, {
      delete_conversation_channels: true,
      mark_messages_deleted: true,
      hard_delete: true,
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Stream user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};
