const express = require("express");
const poolController = require("../controllers/pool.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

// ROUTE: POST Create new pool
router.route("/").post(auth, poolController.createPool);

module.exports = router;
