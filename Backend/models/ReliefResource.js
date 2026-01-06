const mongoose = require("mongoose");

const reliefResourceSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Food", "Clothing", "Medicine", "Other"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      default: "packs", 
    },

    description: {
      type: String,
      trim: true,
    },

    lastUpdatedBy: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReliefResource", reliefResourceSchema);