const express = require("express");
const router = express.Router();

//home
router.get("/", (req, res) => {
  res.render("home/home", {
    title: "home"
  })
});
//Meals Package
router.get("/mealPack", (req, res) => {
  res.render("home/mealPack", {
    title: "mealPack"
  })
});

module.exports = router;