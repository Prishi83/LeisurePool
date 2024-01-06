const Joi = require("joi");
const { objectId } = require("./custom.validation");

// Validate Pool
function validatePool(pool) {
  const schema = Joi.object({
    address: Joi.string().required().min(5).max(255),
    instructions: Joi.string().required().min(5).max(255),
    name: Joi.string().required().min(5).max(50),
    description: Joi.string().required().min(5).max(255),
    amenities: Joi.array().items(
      Joi.object({
        _id: Joi.custom(objectId),
      })
    ),
    isRestRoomAvailable: Joi.boolean().required(),
    restRoomDescription: Joi.string().min(5).max(255),
    additionalAmenities: Joi.string().min(5).max(255),
    furniture: Joi.array().items(
      Joi.object({
        name: Joi.string().valid("Umbrella", "Lounge Chairs", "Lunch Table"),
        count: Joi.number().default(0).min(0),
      })
    ),
    poolArea: Joi.object({
      length: Joi.number().required().min(0),
      width: Joi.number().required().min(0),
    }).required(),
    poolDepth: Joi.object({
      shallowestPoint: Joi.number().required().min(0),
      deepestPoint: Joi.number().required().min(0),
    }),
    charge: Joi.number().valid(15, 30, 45, 60).required(),
    weeklyDiscount: Joi.number().valid(5, 10, 15, 20, 25, 30, 35, 40, 45, 50),
    maxGuest: Joi.number().valid(5, 10, 15, 20, 25, 30).required(),
    extraGuestFee: Joi.number().valid(1, 3, 5, 10).required(),
    maxPoolCapacity: Joi.number().required().max(999),
    allowChildren: Joi.boolean().required(),
    allowInfants: Joi.boolean().required(),
    poolPrivacy: Joi.string()
      .valid("Not Too Private", "Pretty Private", "Super Private")
      .required(),
    poolRules: Joi.object({
      noParty: Joi.boolean(),
      noSmoking: Joi.boolean(),
      noAlcohol: Joi.boolean(),
      noGlass: Joi.boolean(),
      noLoudMusic: Joi.boolean(),
      noFood: Joi.boolean(),
      noPets: Joi.boolean(),
    }),
    additionalRules: Joi.string().min(5).max(255),
    cancellationPolicy: Joi.string()
      .valid("Really Chilled Out", "Chilled Out", "Not Chilled")
      .required(),
    user: Joi.custom(objectId).required(),
  });

  return schema.validate(pool);
}

module.exports = validatePool;
