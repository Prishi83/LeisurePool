const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const validateResendEmail = require("../validations/resend.validation");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const crypto = require("crypto");
const sendEmail = require("../services/email.service");

// Resend Email Verification Link
const resendVerificationEmail = catchAsync(async (req, res) => {
  const email = req.body.email;

  // Validate request body
  const { error } = validateResendEmail(req.body);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  // Check if email already verified or not
  if (await userService.isEmailVerified(email)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email already verified. Please login"
    );
  }

  // Find User from database
  const result = await userService.findUserByEmail(email);

  // If User not found in database
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User with given email not found");
  }

  // Generate Token for email verification
  const id = result._id;
  const token = crypto.randomBytes(16).toString("hex");
  const tokenBody = {
    _userId: id,
    token: token,
  };

  // Save Token in Database
  const generatedToken = await tokenService.createToken(tokenBody);

  // Send Email
  await sendEmail(result.email, generatedToken.token);

  // Send User & Token as response
  res
    .status(httpStatus.CREATED)
    .send("A verification email has been sent to " + email + ".");
});

module.exports = {
  resendVerificationEmail,
};
