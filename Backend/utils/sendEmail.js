const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Optional: verify transporter at startup (won't crash app)
transporter.verify((error) => {
  if (error) {
    console.error("Email transporter error:", error.message);
  } else {
    console.log("Email transporter is ready ✅");
  }
});

/* ============================
   SHARED SENDER CONFIG
============================ */
const FROM = `"Relief System" <${process.env.EMAIL_USER}>`;

/* ============================
   OTP EMAIL (KEEP EXISTING)
============================ */
const sendOtpEmail = async (to, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>Password Reset OTP</h2>
      <p>Your OTP for resetting your password is:</p>
      <h1 style="letter-spacing: 4px;">${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    </div>
  `;

  const mailOptions = {
    from: FROM,
    to,
    subject: "Your Password Reset OTP",
    html,
    replyTo: process.env.EMAIL_USER
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("sendOtpEmail failed:", err.message);
    return false;
  }
};

/* ============================
   GENERIC EMAIL SENDER
============================ */
const sendEmail = async ({ to, subject, html, text }) => {
  if (!to) return false;

  const mailOptions = {
    from: FROM,
    to,
    subject,
    text,
    html,
    replyTo: process.env.EMAIL_USER
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("sendEmail failed:", err.message);
    return false;
  }
};

/* ============================
   NOTIFICATION EMAIL TEMPLATES
============================ */
const reliefStatusEmail = ({ name, requestId, status }) => ({
  subject: `Relief Request Status Updated`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>Relief Request Update</h2>
      <p>Hello <b>${name}</b>,</p>
      <p>Your relief request (<b>${requestId}</b>) status is now:</p>
      <h3>${String(status).toUpperCase()}</h3>
      <p>Thank you.</p>
    </div>
  `
});

const volunteerAssignmentVictimEmail = ({ victimName, volunteerName, requestId }) => ({
  subject: "Volunteer Assigned to Your Request",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>Volunteer Assigned</h2>
      <p>Hello <b>${victimName}</b>,</p>
      <p>Volunteer <b>${volunteerName}</b> has been assigned to your request.</p>
      <p>Request ID: <b>${requestId}</b></p>
    </div>
  `
});

const volunteerAssignmentVolunteerEmail = ({ volunteerName, victimName, district, requestId }) => ({
  subject: "New Relief Assignment",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>New Assignment</h2>
      <p>Hello <b>${volunteerName}</b>,</p>
      <p>You have been assigned to a relief request.</p>
      <p><b>Victim:</b> ${victimName}</p>
      <p><b>District:</b> ${district}</p>
      <p><b>Request ID:</b> ${requestId}</p>
      <p>Please login for details.</p>
    </div>
  `
});

const donationCreatedEmail = ({ name, amount, method }) => ({
  subject: "Donation Received (Pending Review)",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>Donation Received</h2>
      <p>Hello <b>${name}</b>,</p>
      <p>We received your donation of <b>৳${amount}</b> via <b>${method}</b>.</p>
      <p>Status: <b>Pending</b></p>
      <p>Thank you.</p>
    </div>
  `
});

const donationStatusEmail = ({ name, amount, status }) => ({
  subject: `Donation ${status}`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>Donation Status Update</h2>
      <p>Hello <b>${name}</b>,</p>
      <p>Your donation of <b>৳${amount}</b> has been <b>${status}</b>.</p>
      <p>Thank you for supporting!</p>
    </div>
  `
});

module.exports = {
  sendOtpEmail,
  sendEmail,
  reliefStatusEmail,
  volunteerAssignmentVictimEmail,
  volunteerAssignmentVolunteerEmail,
  donationCreatedEmail,
  donationStatusEmail
};
