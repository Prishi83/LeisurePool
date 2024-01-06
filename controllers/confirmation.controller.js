const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
const pick = require("../utils/pick");

// Confirm Email Verification
const verifyUser = catchAsync(async (req, res) => {
  const token = req.params.token;

  // If token not present in url
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Verification Link");
  }

  // Find Token details from database
  const tokenBody = await tokenService.getTokenBody(token);

  // Check if token expired or not
  if (!tokenBody._userId) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Token Expired. Click Resend to Generate new token"
    );
  }

  const id = tokenBody._userId;

  // Confirm user email verification
  let result = await userService.updateUser(id, { isVerified: true });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "The customer with the given ID was not found."
    );
  }

  // Delete token after confirmation
  await tokenService.deleteToken(token);

  result = JSON.parse(JSON.stringify(result));
  result = pick(result, ["name", "email"]);
  res.send(result);
});

module.exports = {
  verifyUser,
};
