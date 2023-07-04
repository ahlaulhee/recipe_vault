require("dotenv").config();
const { Router } = require("express");

const router = Router();

const recipeRoutes = require("./recipeRouter");
const dietRoutes = require("./dietRouter");

router.use("/recipes", recipeRoutes);
router.use("/diets", dietRoutes);

module.exports = router;
