const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

const validate = (inputs) => {
  let errors = {};

  if (!inputs.title) {
    errors.title = "The recipe must have a name";
  } else if (inputs.title.length < 10 || inputs.title.length > 75) {
    errors.title =
      "The recipe name length must be between 10 and 75 characters";
  }

  if (!inputs.summary) {
    errors.summary = "The recipe must have a summary";
  } else if (inputs.summary.length < 5 || inputs.summary.length > 50) {
    errors.summary =
      "The recipe summary length must be between 5 and 50 characters";
  }

  if (!inputs.healthScore) {
    errors.healthScore = "The recipe must have a health score";
  } else if (inputs.healthScore <= 0 || inputs.healthScore > 100) {
    errors.healthScore = "The health score must be a number between 0 and 100";
  }

  if (!inputs.image) {
    errors.image = "The recipe must have an image";
  } else if (!urlRegex.test(inputs.image)) {
    errors.image = "The recipe image must be a url";
  }

  if (inputs.diets.length === 0) {
    errors.diets = "The recipe must have at least one type of diet.";
  }

  if (new Set(inputs.diets).size !== inputs.diets.length) {
    errors.diets = "There cannot be two of the same diet.";
  }

  if (inputs.steps.length === 0) {
    errors.steps = "The recipe must have at least one step.";
  }
  return errors;
};

module.exports = validate;

// name must contain at least 10 characters
// name must contain less than 75 characters
// name cant be null

// summary must contain at least 5 characters
// summary must contain less than 50 characters
// summary cant be null

// health score must be a number
// health score must be greater than 0
// health score must be less than 20

// image must be a url
// image cant be null

// steps cant be null

// diets cant be null
// diets cant contain two of the same diet
