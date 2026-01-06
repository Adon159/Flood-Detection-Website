const express = require("express");
const router = express.Router();

const {
  makeDonation,
  getMyDonations,
  getTotalAcceptedDonation,
  getAllDonationsAdmin,
  updateDonationStatusAdmin,
} = require("../controllers/donationController");

router.post("/", makeDonation);
router.get("/my", getMyDonations);
router.get("/total", getTotalAcceptedDonation);

router.get("/admin", getAllDonationsAdmin);
router.put("/admin/:id", updateDonationStatusAdmin);

module.exports = router;
