require("dotenv").config();
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getRecipeFromDB = async (idRecipe) => {
  const recipeDB = await Recipe.findOne({
    where: {
      id: idRecipe,
    },
    include: {
      model: Diet,
      as: "diets",
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  if (recipeDB) {
    const plainRecipe = recipeDB.get({ plain: true });
    plainRecipe.diets = plainRecipe.diets.map((diet) => diet.name);
    return plainRecipe;
  }

  return null;
};

const getRecipeFromAPI = async (idRecipe) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&includeNutrition=true&number=100. `
  );
  return response.data;
};

const getRecipeById = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    let recipeDB = null;
    if (idRecipe.length === 36) {
      recipeDB = await getRecipeFromDB(idRecipe);
    }
    let recipeAPI = null;

    if (!recipeDB) {
      recipeAPI = await getRecipeFromAPI(idRecipe);
    }

    if (recipeDB) {
      res.status(200).json(recipeDB);
    } else if (recipeAPI) {
      res.status(200).json(recipeAPI);
    } else {
      res.status(404).json("No recipes found with that ID.");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getRecipeById;
