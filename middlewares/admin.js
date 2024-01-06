const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    throw new ApiError(httpStatus.FORBIDDEN, "Access denied.");

  next();
};
