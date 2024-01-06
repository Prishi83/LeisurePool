const Joi = require("joi");
const { password } = require("./custom.validation");

// Validate user email & password for login
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().max(1024),
  });

  return schema.validate(user);
}

module.exports = validateLogin;
