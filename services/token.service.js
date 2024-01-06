const Token = require("../models/token.model");

// Create new token for email verification
const createToken = async (tokenBody) => {
  const token = await Token.create(tokenBody);
  return token;
};

// Find Token details using token
const getTokenBody = async (token) => {
  const tokenBody = await Token.findOne({ token: token });
  return tokenBody;
};

// Delete token from database
const deleteToken = async (token) => {
  return await Token.deleteOne({ token: token });
};

module.exports = {
  createToken,
  getTokenBody,
  deleteToken,
};
