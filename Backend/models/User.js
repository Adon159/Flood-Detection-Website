const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },

    role: {
      type: String,
      enum: ["Victim", "Donor", "Volunteer", "Admin"],
      default: "Victim",
    },

    status: {
      type: String,
      enum: ["Active", "Deactive"],
      default: "Active",
    },

    otp: String,
    otpExpire: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
