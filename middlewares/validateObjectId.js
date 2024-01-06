const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

// Validate MongoDB ID (_id)
module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid ID");

  next();
};
