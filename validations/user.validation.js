const Joi = require("joi");
const { password } = require("./custom.validation");

// Validate User name, email & password.
function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(5).max(255),
    password: Joi.string().required().custom(password).min(8).max(1024),
    name: Joi.string().required().min(2).max(50),
  });

  return schema.validate(user);
}

module.exports = validateUser;
