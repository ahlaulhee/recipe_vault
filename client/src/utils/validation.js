const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

const validate = (inputs) => {
  let errors = {};

  if (!inputs.name) {
    errors.name = "The recipe must have a name";
  } else if (inputs.name.length < 10 || inputs.name.length > 75) {
    errors.name = "The recipe name length must be between 10 and 75 characters";
  }

  if (!inputs.summary) {
    errors.summary = "The recipe must have a summary";
  } else if (inputs.summary.length < 5 || inputs.summary.length > 50) {
    errors.summary =
      "The recipe summary length must be between 5 and 50 characters";
  }

  if (!inputs.health_score) {
    errors.health_score = "The recipe must have a health score";
  } else if (inputs.health_score <= 0 || inputs.health_score > 20) {
    errors.health_score = "The health score must be a number between 0 and 20";
  }

  if (!inputs.image) {
    errors.image = "The recipe must have an image";
  } else if (!urlRegex.test(inputs.image)) {
    errors.image = "The recipe image must be a url";
  }
  return errors;
};

module.exports = validate;

// name must contain atleast 10 characters
// name must contain less than 75 characters
// name cant be null

// summary must contain atleast 5 characters
// summary must contain less than 50 characters
// summary cant be null

// health score must be a number
// health score must be greater than 0
// health score must be less than 20

// image must be a url
// image cant be null

// diet and steps can be null
