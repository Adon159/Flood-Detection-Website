// models/ReliefRequest.js

const mongoose = require("mongoose");

const reliefRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    district: {
      type: String,
      required: true
    },

    contactNumber: {
      type: String,
      required: true
    },

    helpType: {
      type: String,
      enum: ["Food", "Shelter", "Medicine", "Clothing", "Other"],
      required: true
    },

    description: {
      type: String
    },

    proofFile: {
      type: String
    },

    // ✅ UPDATED: Admin flow (Pending → Approved → Delivered) + Rejected
    status: {
      type: String,
      enum: ["pending", "approved", "delivered", "rejected"],
      default: "pending"
    },

    // ✅ Volunteer assignment (keep)
    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReliefRequest", reliefRequestSchema);
