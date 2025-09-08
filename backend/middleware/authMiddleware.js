// Authentication middleware for Stream Chat endpoints

const {account} = require("../services/appwrite");

/**
 * Middleware to verify user authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
module.exports = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing or invalid",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    try {
      // Verify the token with Appwrite
      const session = await account.getSession(token);

      // Attach user data to the request
      req.user = {
        id: session.userId,
        sessionId: session.$id,
      };

      // Continue to the route handler
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};
