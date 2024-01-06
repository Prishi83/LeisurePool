const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

// ROUTE: POST Create new user
router.route("/").post(userController.createUser);
// ROUTE: GET All details for logged in user
router.route("/").get(auth, userController.getAllLoggedInUserInfo);

module.exports = router;
