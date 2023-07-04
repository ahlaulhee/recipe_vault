const { Router } = require("express");
const router = Router();

const getRecipesById = require("../utils/getRecipeById");
const getRecipesByName = require("../utils/getRecipesByName");
const postRecipe = require("../utils/postRecipe");

router.get("/:idRecipe", (req, res) => getRecipesById(req, res));
router.get("/", (req, res) => getRecipesByName(req, res));
router.post("/", (req, res) => postRecipe(req, res));

module.exports = router;
