const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Check if fields are empty, turn the field into empty string
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Check if the required field are empty, return error
  if (Validator.isEmpty(data.title))
    errors.title = "Job title field is required";
  if (Validator.isEmpty(data.from)) errors.from = "From date field is required";
  if (Validator.isEmpty(data.company))
    errors.company = "Company name field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
