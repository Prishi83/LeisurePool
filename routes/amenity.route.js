const express = require("express");
const amenityController = require("../controllers/amenity.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = express.Router();

// ROUTE: POST Create new user
router.route("/").post([auth, admin], amenityController.createAmenity);

module.exports = router;
