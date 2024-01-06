const Joi = require("joi");

// Validate email for email verification
function validateResendEmail(email) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(5).max(255),
  });

  return schema.validate(email);
}

module.exports = validateResendEmail;
