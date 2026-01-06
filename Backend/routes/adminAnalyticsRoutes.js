const express = require("express");
const router = express.Router();

const User = require("../models/User");
const ReliefRequest = require("../models/ReliefRequest");
const Donation = require("../models/Donation");
const Resource = require("../models/ReliefResource");


router.get("/admin/analytics", async (req, res) => {
  try {
    const victimsHelped = await ReliefRequest.countDocuments({
      status: "completed",
    });

    const pendingRequests = await ReliefRequest.countDocuments({
      status: "pending",
    });

    const donationStats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          donationCount: { $sum: 1 },
        },
      },
    ]);

    const resources = await Resource.find();

    const totalStock = resources.reduce(
      (sum, r) => sum + (r.quantity || 0),
      0
    );

    const resourcesDistributed = resources.reduce(
      (sum, r) => sum + (r.distributed || 0),
      0
    );

    res.json({
      victimsHelped,
      pendingRequests,
      donations: {
        totalAmount: donationStats[0]?.totalAmount || 0,
        totalDonations: donationStats[0]?.donationCount || 0,
      },
      resources: {
        totalStock,
        distributed: resourcesDistributed,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      message: "Failed to generate analytics",
      error: error.message,
    });
  }
});

module.exports = router;