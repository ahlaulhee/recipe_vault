require("dotenv").config();
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

const getRecipesFromAPI = async (name) => {
  const url = name
    ? `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&apiKey=${API_KEY}&addRecipeInformation=true`
    : `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`;

  const response = await axios.get(url);
  return response.data.results.map((recipe) => {
    delete recipe.analyzedInstructions;
    return recipe;
  });
};

const getRecipesFromDB = async (name) => {
  const options = {
    include: {
      model: Diet,
      as: "diets",
      attributes: ["name"],
      through: { attributes: [] },
    },
  };

  if (name) {
    options.where = {
      title: {
        [Op.like]: `%${name}%`,
      },
    };
  }

  const recipes = await Recipe.findAll(options);
  return recipes.map((recipe) => {
    const plainRecipe = recipe.get({ plain: true });
    plainRecipe.diets = plainRecipe.diets.map((diet) => diet.name);
    return plainRecipe;
  });
};

const getRecipesByName = async (req, res) => {
  try {
    const { name } = req.query;
    const recipesAPI = await getRecipesFromAPI(name);
    const recipesDB = await getRecipesFromDB(name);
    const combinedRecipes = recipesAPI.concat(recipesDB);
    res.status(200).json({ combinedRecipes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getRecipesByName;
