const Amenity = require("../models/amenity.model");

// Create new amenity
const createAmenity = async (amenity) => {
  return await Amenity.create(amenity);
};

module.exports = {
  createAmenity,
};
