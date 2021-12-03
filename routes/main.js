const express = require("express");
const router = express.Router();
const Clerk = require('../models/Clerk');
const session = require('express-session');

//home
router.get("/", (req, res) => {
  Clerk.findAll({
    order: ["id"]
  }).then((data) => {
    res.render("home/home", {
      title: "Batu's Steakhouse",
      layout: "main",
      data: data
    });
  })
});


//Meals Package
router.get("/mealPack", (req, res) => {
  res.render("home/mealPack", {
    title: "Meal Packages | Batu's Steakhouse"
  })
});

module.exports = router;