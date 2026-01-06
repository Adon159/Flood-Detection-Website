const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.patch("/admin/activate/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "Active" });
    res.json({ message: "User activated" });
  } catch (err) {
    res.status(500).json({
      message: "Error activating user",
      error: err.message,
    });
  }
});

router.patch("/admin/deactivate/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "Deactive" });
    res.json({ message: "User deactivated" });
  } catch (err) {
    res.status(500).json({
      message: "Error deactivating user",
      error: err.message,
    });
  }
});

router.delete("/admin/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message,
    });
  }
});

router.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Error loading users",
      error: err.message,
    });
  }
});
module.exports = router;
