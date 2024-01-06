const express = require("express");
const confirmationController = require("../controllers/confirmation.controller");

const router = express.Router();

// ROUTE: GET Email Verification confirmation
router.route("/:token").get(confirmationController.verifyUser);

module.exports = router;
