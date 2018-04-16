const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Check if fields are empty, turn the field into empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check if the required field are empty, return error
  if (Validator.isEmpty(data.email)) errors.email = "Email field is required";
  if (Validator.isEmpty(data.password))
    errors.password = "Password field is required";

  // Validation for name, email, and password
  if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";
  if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be at least 6 characters";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
