const Joi = require("joi");

// Validate Amenity name
function validateAmenity(amenity) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
  });

  return schema.validate(amenity);
}

module.exports = validateAmenity;
