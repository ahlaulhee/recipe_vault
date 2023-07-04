const { Router } = require("express");
const router = Router();

const getDiets = require("../utils/getDiets");

router.get("/", (req, res) => getDiets(req, res));

module.exports = router;
