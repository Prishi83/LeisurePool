const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
const validateObjectId = require("../middlewares/validateObjectId");
const validateUser = require("../validations/user.validation");
const crypto = require("crypto");
const sendEmail = require("../services/email.service");

// Create New User
const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  // Validate request body
  const { error } = validateUser(user);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  // Check if email already exist or not
  if (await userService.isEmailTaken(user.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  // Save User in database
  const result = await userService.createUser(user);

  // Generate Token for email verification
  const id = result._id;
  const token = crypto.randomBytes(16).toString("hex");
  const tokenBody = {
    _userId: id,
    token: token,
  };

  // Save Token in database
  const generatedToken = await tokenService.createToken(tokenBody);

  // Send Email to user
  await sendEmail(result.email, generatedToken.token);

  // Send User & Token as response
  res
    .status(httpStatus.CREATED)
    .send("A verification email has been sent to " + user.email + ".");
});

const getAllLoggedInUserInfo = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await userService.getAllLoggedInUserInfo(user._id);
  console.log(result);
  res.send(result);
});

module.exports = {
  createUser,
  getAllLoggedInUserInfo,
};
