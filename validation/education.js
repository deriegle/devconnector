const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Check if fields are empty, turn the field into empty string
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";

  // Check if the required field are empty, return error
  if (Validator.isEmpty(data.fieldofstudy))
    errors.fieldofstudy = "Field of study is required";
  if (Validator.isEmpty(data.from)) errors.from = "From date field is required";
  if (Validator.isEmpty(data.degree))
    errors.degree = "Degree field is required";
  if (Validator.isEmpty(data.school))
    errors.school = "School field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
