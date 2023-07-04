require("dotenv").config();
const { Diet } = require("../db");
const getDiets = async (req, res) => {
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
      res.status(200).json(newDiets);
    } else {
      res.status(304).json(diets);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDiets;
