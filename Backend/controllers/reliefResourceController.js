const ReliefResource = require("../models/ReliefResource");

exports.addResource = async (req, res) => {
  try {
    const resource = await ReliefResource.create(req.body);
    res.status(201).json({
      message: "Relief resource added successfully",
      data: resource,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add resource",
      error: err.message,
    });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await ReliefResource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const updated = await ReliefResource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({
      message: "Resource updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update resource",
      error: err.message,
    });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const deleted = await ReliefResource.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete resource",
      error: err.message,
    });
  }
};