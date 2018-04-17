const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Check if fields are empty, turn the field into empty string
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 }))
    errors.text = "Text field must be between 10 and 300 characters";

  // Check if the required field are empty, return error
  if (Validator.isEmpty(data.text)) errors.text = "Text field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
