const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getUserFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token");

  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.getProfile = async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    const requestedUserId = req.params.id;

    if (decoded.id !== requestedUserId && decoded.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(requestedUserId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      message: error.message || "Invalid or expired token",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    const requestedUserId = req.params.id;

    if (decoded.id !== requestedUserId && decoded.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const {
      name,
      email,
      phone,
      address,
      district,
      gender,
      age,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      requestedUserId,
      {
        name,
        email,
        phone,
        address,
        district,
        gender,
        age,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || "Invalid or expired token",
    });
  }
};
