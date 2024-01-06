const jwt = require("jsonwebtoken");
const config = require("../configs/config");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

// Check if JWT token is present in header & authenticate user.
module.exports = function (req, res, next) {
  if (!config.jwtPrivateKey) return next();

  const token = req.header("x-auth-token");
  if (!token)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Access denied. No token provided."
    );

  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Token.");
  }
};
