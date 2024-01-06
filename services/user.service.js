const User = require("../models/user.model");

// Check if email already registered or not
const isEmailTaken = async (email) => {
  return await User.isEmailTaken(email);
};

// Check if email already verified or not
const isEmailVerified = async (email) => {
  return await User.isEmailVerified(email);
};

// Check if password match to that saved in database or not.
const isPasswordMatch = async (user, password) => {
  return await user.isPasswordMatch(password);
};

// Generate JWT token
const generateAuthToken = async (user) => {
  return await user.generateAuthToken();
};

// Create New User in database
const createUser = async (userBody) => {
  return await User.create(userBody);
};

// Find a User with a specific email
const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

// Find user using id & update the user
const updateUser = async (id, user) => {
  return await User.findByIdAndUpdate(id, user, { new: true });
};

// Get all details for logged in user
const getAllLoggedInUserInfo = async (id) => {
  return await User.find({ _id: id }).populate({
    path: "poolsHosted",
    populate: {
      path: "amenities",
      model: "Amenity",
    },
  });
};

module.exports = {
  isEmailTaken,
  createUser,
  updateUser,
  findUserByEmail,
  isEmailVerified,
  isPasswordMatch,
  generateAuthToken,
  getAllLoggedInUserInfo,
};
