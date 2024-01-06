const express = require("express");
const userRoute = require("./user.route");
const confirmationRoute = require("./confirmation.route");
const resendRoute = require("./resend.route");
const authRoute = require("./auth.route");
const amenityRoute = require("./amenity.route");
const poolRoute = require("./pool.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/confirmation",
    route: confirmationRoute,
  },
  {
    path: "/resend",
    route: resendRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/amenities",
    route: amenityRoute,
  },
  {
    path: "/pools",
    route: poolRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
