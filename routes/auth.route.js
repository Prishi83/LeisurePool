const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// ROUTE: POST Authenticate user
router.route("/").post(authController.authenticateUser);

module.exports = router;
