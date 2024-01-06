const Pool = require("../models/pool.model");

// Create new Pool
const createPool = async (pool) => {
  return await Pool.create(pool);
};

module.exports = {
  createPool,
};
