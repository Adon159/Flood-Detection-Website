const express = require("express");
const router = express.Router();
const {
  getAssignedRequests,
  updateDeliveryStatus
} = require("../controllers/volunteerController");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Basic role check: only allow users with role 'Volunteer'
      if (!decoded || decoded.role !== "Volunteer") {
        return res.status(403).json({ message: "Forbidden: volunteers only" });
      }

      req.user = { id: decoded.id, role: decoded.role };

      next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// View assigned victims/areas
router.get("/assignments", authMiddleware, getAssignedRequests);

// Update delivery status
router.put("/delivery/:requestId", authMiddleware, updateDeliveryStatus);

module.exports = router;