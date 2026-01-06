const express = require("express");
const router = express.Router();

const ReliefRequest = require("../models/ReliefRequest");
const User = require("../models/User");
const upload = require("../utils/upload");

const {
  sendEmail,
  reliefStatusEmail,
  volunteerAssignmentVictimEmail,
  volunteerAssignmentVolunteerEmail
} = require("../utils/sendemail");

/* =========================================================
   SUBMIT RELIEF REQUEST (KEEP SAME)
========================================================= */
router.post("/submit", (req, res) => {
  upload.single("proofFile")(req, res, async function (err) {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({ message: err.message || "File upload error" });
    }

    try {
      console.log("Relief submit received:", {
        body: req.body,
        file: req.file && req.file.filename
      });

      const { userId, district, contactNumber, helpType, description } = req.body;

      const missing = [];
      if (!userId) missing.push("userId");
      if (!district) missing.push("district");
      if (!contactNumber) missing.push("contactNumber");
      if (!helpType) missing.push("helpType");

      if (missing.length) {
        console.warn("Relief submit missing fields:", missing);
        return res.status(400).json({
          message: `Missing required fields: ${missing.join(", ")}`
        });
      }

      const reliefRequest = new ReliefRequest({
        userId,
        district,
        contactNumber,
        helpType,
        description,
        proofFile: req.file ? req.file.filename : null
      });

      await reliefRequest.save();

      res.status(201).json({
        message: "Relief request submitted successfully",
        data: reliefRequest
      });
    } catch (error) {
      console.error("Relief submit error:", error);

      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({ message: "Validation failed", errors });
      }

      res.status(500).json({
        message: "Submission failed",
        error: error.message
      });
    }
  });
});

/* =========================================================
   ADMIN: Get all relief requests (with victim + assigned volunteer)
========================================================= */
router.get("/admin", async (req, res) => {
  try {
    const requests = await ReliefRequest.find()
      .populate("userId", "name email role")
      .populate("assignedVolunteer", "name email role")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch requests",
      error: err.message
    });
  }
});

/* =========================================================
   ADMIN: Update request status + Email victim
   ✅ Updated to support: pending → approved → delivered, and rejected
========================================================= */
router.put("/admin/:id/status", async (req, res) => {
  const { status } = req.body;

  // ✅ UPDATED STATUS OPTIONS
  const allowedStatuses = ["pending", "approved", "delivered", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const request = await ReliefRequest.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    // ✅ (Optional) enforce flow: pending -> approved -> delivered
    // allow rejected from any state
    if (status !== "rejected") {
      const flow = { pending: 1, approved: 2, delivered: 3 };
      const current = flow[request.status];
      const next = flow[status];

      // if current status isn't in flow (old data "completed"), skip strict check
      if (current && next && next < current) {
        return res.status(400).json({
          message: `Invalid status flow. Current: ${request.status}, new: ${status}`
        });
      }
    }

    request.status = status;
    await request.save();

    // ✅ Send email to victim
    const victim = request.userId;
    if (victim?.email) {
      const tpl = reliefStatusEmail({
        name: victim.name,
        requestId: request._id,
        status
      });

      await sendEmail({
        to: victim.email,
        subject: tpl.subject,
        html: tpl.html
      });
    }

    res.json({ message: "Status updated & email sent", request });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update status",
      error: err.message
    });
  }
});

/* =========================================================
   ADMIN: Assign volunteer + Email victim & volunteer
========================================================= */
router.put("/admin/:id/assign", async (req, res) => {
  const { volunteerId } = req.body;

  try {
    const request = await ReliefRequest.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!request) return res.status(404).json({ message: "Request not found" });

    const volunteer = await User.findById(volunteerId).select("name email role");
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    if (volunteer.role !== "Volunteer") {
      return res.status(400).json({ message: "Selected user is not a Volunteer" });
    }

    request.assignedVolunteer = volunteer._id;
    await request.save();

    const victim = request.userId;

    // ✅ Email victim
    if (victim?.email) {
      const victimTpl = volunteerAssignmentVictimEmail({
        victimName: victim.name,
        volunteerName: volunteer.name,
        requestId: request._id
      });

      await sendEmail({
        to: victim.email,
        subject: victimTpl.subject,
        html: victimTpl.html
      });
    }

    // ✅ Email volunteer
    if (volunteer?.email) {
      const volTpl = volunteerAssignmentVolunteerEmail({
        volunteerName: volunteer.name,
        victimName: victim?.name || "Victim",
        district: request.district,
        requestId: request._id
      });

      await sendEmail({
        to: volunteer.email,
        subject: volTpl.subject,
        html: volTpl.html
      });
    }

    res.json({ message: "Volunteer assigned & emails sent", request });
  } catch (err) {
    res.status(500).json({
      message: "Failed to assign volunteer",
      error: err.message
    });
  }
});

module.exports = router;
