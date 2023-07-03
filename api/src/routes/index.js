require("dotenv").config();
const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { API_KEY } = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:idRecipe", async (req, res) => {
  // https://api.spoonacular.com/recipes/716429/information
  try {
    const { idRecipe } = req.params;
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&includeNutrition=true&number=100. `
      )
      .then((response) => {
        res.status(201).json(response.data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/recipes", async (req, res) => {
  //https://api.spoonacular.com/recipes/complexSearch?query=name
  try {
    const { name } = req.query;
    if (name) {
      const recipesByNameAPI = await axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&apiKey=${API_KEY}&addRecipeInformation=true`
        )
        .then((response) => response.data);
      let recipesByNameDB = await Recipe.findAll({
        where: {
          title: {
            [Op.like]: `%${name}%`,
          },
        },
        include: {
          model: Diet,
          as: "diets",
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      recipesByNameAPI.results.forEach((recipe) => {
        delete recipe.analyzedInstructions;
      });

      recipesByNameDB = recipesByNameDB.map((recipe) => {
        recipe = recipe.get({ plain: true });
        recipe.diets = recipe.diets.map((diet) => diet.name);
        return recipe;
      });

      const combinedRecipes = recipesByNameAPI.results.concat(recipesByNameDB);
      res.status(201).json({ combinedRecipes });
    } else {
      const allRecipesAPI = await axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
        )
        .then((response) => response.data);
      let allRecipesDB = await Recipe.findAll({
        include: {
          model: Diet,
          as: "diets",
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      allRecipesAPI.results.forEach((recipe) => {
        delete recipe.analyzedInstructions;
      });

      allRecipesDB = allRecipesDB.map((recipe) => {
        recipe = recipe.get({ plain: true });
        recipe.diets = recipe.diets.map((diet) => diet.name);
        return recipe;
      });
      const combinedRecipes = allRecipesAPI.results.concat(allRecipesDB);
      res.status(201).json({ combinedRecipes });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/recipes", async (req, res) => {
  try {
    const { title, image, summary, healthScore, steps, diets } = req.body;
    const newRecipe = await Recipe.create({
      title,
      image,
      summary,
      healthScore,
      steps,
    });
    await newRecipe.addDiets(diets);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/diets", async (req, res) => {
  // const res = axios
  //   .get(`https://api.spoonacular.com/recipes/dietTypes?apiKey=${API_KEY}`)
  //   .then((response) => response.data);
  try {
    const count = await Diet.count();
    const diets = [
      { name: "Gluten Free" },
      { name: "Ketogenic" },
      { name: "Vegetarian" },
      { name: "Lacto-Vegetarian" },
      { name: "Ovo-Vegetarian" },
      { name: "Vegan" },
      { name: "Pescetarian" },
      { name: "Paleo" },
      { name: "Primal" },
      { name: "Low FODMAP" },
      { name: "Whole30" },
    ];

    if (count === 0) {
      const newDiets = await Diet.bulkCreate(diets);
      res.json(newDiets);
    } else {
      res.json(diets);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
