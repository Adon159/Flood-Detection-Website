const express = require("express");
const router = express.Router();
const {
  register,
  login,
  me,
  sendOtp,
  resetPassword
} = require("../controllers/loginRegister");

router.post("/register", register);
router.post("/login", login);

router.get("/me", me);

router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
