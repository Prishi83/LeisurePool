const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");
const validateLogin = require("../validations/auth.validation");

// Authenticate User credentials
const authenticateUser = catchAsync(async (req, res) => {
  const user = req.body;

  // Validate request body
  const { error } = validateLogin(user);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  // Find User with specific email from database
  const result = await userService.findUserByEmail(user.email);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password.");
  }

  // Check if email of User is verified or not
  if (!result.isVerified) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Email not verified. Please verify email first."
    );
  }

  // Check if password matches to password saved in Database
  const validPassword = await userService.isPasswordMatch(
    result,
    user.password
  );
  if (!validPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password.");
  }

  // Generate JWT token
  const token = await userService.generateAuthToken(result);
  res.send(token);
});

module.exports = {
  authenticateUser,
};
