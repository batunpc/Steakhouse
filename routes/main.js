const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const db = require('../config/database')
const Clerk = require('../models/Clerk');

//home
router.get("/", (req, res) => {
  Clerk.findAll({
    order: ["id"]
  }).then((data) => {
    res.render("home/home", {
      title: "homePageUpdate",
      layout: "main",
      data: data
    });
  })
});


//Meals Package
router.get("/mealPack", (req, res) => {
  res.render("home/mealPack", {
    title: "mealPack"
  })
});

module.exports = router;