const amenityService = require("../services/amenity.service");
const validateAmenity = require("../validations/amenity.validation");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

// Create New Amenity
const createAmenity = catchAsync(async (req, res) => {
  const amenity = req.body;

  // Validate request body
  const { error } = validateAmenity(amenity);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  // Save Amenity in database
  const result = await amenityService.createAmenity(amenity);

  // Send Amenity as response
  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  createAmenity,
};
