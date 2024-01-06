const express = require("express");
const resendController = require("../controllers/resend.controller");

const router = express.Router();

// ROUTE: POST Resend email verification
router.route("/").post(resendController.resendVerificationEmail);

module.exports = router;
