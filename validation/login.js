const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Check if fields are empty, turn the field into empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Validation for email
  if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

  // Check if the required field are empty, return error
  if (Validator.isEmpty(data.email)) errors.email = "Email field is required";
  if (Validator.isEmpty(data.password))
    errors.password = "Password field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
