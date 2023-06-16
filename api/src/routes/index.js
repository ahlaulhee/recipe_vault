const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:idRecipe", async (req, res) => {
  // https://api.spoonacular.com/recipes/716429/information
  try {
    const { idRecipe } = req.params;
  } catch (error) {}
});

router.get("recipes/", async (req, res) => {
  //https://api.spoonacular.com/recipes/complexSearch?query=name
  try {
    const { name } = req.query;
  } catch (error) {}
});

router.post("/recipes", async (req, res) => {
  try {
    const { id, name, image, summary, health_score, recipe } = req.body;
  } catch (error) {}
});

router.get("/diets", async (req, res) => {
  const diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];
  try {
  } catch (error) {}
});

module.exports = router;
