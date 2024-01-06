const poolService = require("../services/pool.service");
const validatePool = require("../validations/pool.validation");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

// Create New Pool
const createPool = catchAsync(async (req, res) => {
  const pool = req.body;
  pool.user = req.user._id;

  // Validate request body
  const { error } = validatePool(pool);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  // Save Pool in database
  const result = await poolService.createPool(pool);

  // Send Pool as response
  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  createPool,
};
