/**
 * Admin Authorization Middleware
 * Checks if user has admin role
 */

const adminAuth = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during authorization check" });
  }
};

module.exports = adminAuth;
