const Donation = require("../models/Donation");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const {
  sendEmail,
  donationCreatedEmail,
  donationStatusEmail
} = require("../utils/sendEmail");

const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

exports.makeDonation = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const { amount, method, accountNumber, transactionId } = req.body;

    if (!amount || amount <= 0 || !method || !accountNumber || !transactionId) {
      return res.status(400).json({
        message: "All fields are required and amount must be valid",
      });
    }

    const donation = await Donation.create({
      donor: userId,
      amount,
      method,
      accountNumber,
      transactionId,
      status: "Pending",
    });

    // ✅ NEW: Email donor after donation created (Pending)
    try {
      const donorUser = await User.findById(userId).select("name email");
      if (donorUser?.email) {
        const tpl = donationCreatedEmail({
          name: donorUser.name,
          amount: donation.amount,
          method: donation.method
        });

        await sendEmail({
          to: donorUser.email,
          subject: tpl.subject,
          html: tpl.html
        });
      }
    } catch (mailErr) {
      console.error("Donation created email failed:", mailErr.message);
      // don't block donation submission if email fails
    }

    res.status(201).json({
      message: "Donation submitted successfully. Awaiting verification.",
      donation,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "This transaction ID has already been used",
      });
    }

    res.status(401).json({ message: err.message });
  }
};

exports.getMyDonations = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const donations = await Donation.find({ donor: userId }).sort({
      createdAt: -1,
    });

    res.json(donations);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.getTotalAcceptedDonation = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const result = await Donation.aggregate([
      {
        $match: {
          donor: new mongoose.Types.ObjectId(userId), // ✅ FIX
          status: "Accepted",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({ total: result[0]?.total || 0 });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.getAllDonationsAdmin = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};

exports.updateDonationStatusAdmin = async (req, res) => {
  const { status } = req.body;

  if (!["Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    // ✅ CHANGE: populate donor so we can email them
    const donation = await Donation.findById(req.params.id).populate("donor", "name email");

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status !== status) {
      console.log(
        `ADMIN OVERRIDE: Donation ${donation._id} changed from ${donation.status} to ${status}`
      );
    }

    donation.status = status;
    await donation.save();

    // ✅ NEW: Email donor after status update (Accepted/Rejected)
    try {
      const donor = donation.donor;
      if (donor?.email) {
        const tpl = donationStatusEmail({
          name: donor.name,
          amount: donation.amount,
          status: donation.status
        });

        await sendEmail({
          to: donor.email,
          subject: tpl.subject,
          html: tpl.html
        });
      }
    } catch (mailErr) {
      console.error("Donation status email failed:", mailErr.message);
      // don't block admin update if email fails
    }

    res.status(200).json({
      message: `Donation status updated to ${status}`,
      donation,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update donation status" });
  }
};
