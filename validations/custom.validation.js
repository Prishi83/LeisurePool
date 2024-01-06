// Validate password (atleast 8 chars, atleast 1 lower & upper case)
const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }

  if (!value.match(/[a-z]/) || !value.match(/[A-Z]/)) {
    return helpers.message(
      "password must contain at least 1 lowercase and 1 uppercase letter"
    );
  }
  return value;
};

// Validate MongoDB Id
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

module.exports = {
  password,
  objectId,
};
