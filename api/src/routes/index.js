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
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&includeNutrition=true. `
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
          `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`
        )
        .then((response) => response.data);
      const recipesByName = await Recipe.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      res.status(201).json({ recipesByNameAPI, recipesByName });
    } else {
      const allRecipesAPI = await axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`
        )
        .then((response) => response.data);
      const allRecipesDB = await Recipe.findAll();
      res.status(201).json({ allRecipesAPI, allRecipesDB });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/recipes", async (req, res) => {
  try {
    const { name, image, summary, health_score, recipe, diets } = req.body;
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      health_score,
      recipe,
    });
    await newRecipe.addDiets(diets);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/diets", async (req, res) => {
  try {
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
    const newDiets = await Diet.bulkCreate(diets);
    res.json(newDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
