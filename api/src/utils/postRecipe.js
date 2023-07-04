require("dotenv").config();
const { Recipe } = require("../db");

const postRecipe = async (req, res) => {
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
};

module.exports = postRecipe;
