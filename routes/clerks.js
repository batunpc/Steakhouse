const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const db = require('../config/database')
const Clerk = require('../models/Clerk');

const storage = multer.diskStorage({
  destination: "./static/uploads",
  filename: function (req, file, cb) {
    //A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({
  storage: storage
});

router.use(express.static("./uploads/"));

router.get("/register", (req, res) => {
  // fetch all of the names and order them by id
  Clerk.findAll({
    order: ["id"]
  }).then((data) => {
    res.render("admin/clerkRegister", {
      title: "administrator",
      layout: "admin",
      data: data
    });
  })
});

router.post("/register", upload.single("photo"), (req, res) => {
    Clerk.create({
      mealName: req.body.mealName,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      meals_number: req.body.meals_number,
      photo: req.file.filename
    }).then(() => {
      console.log("successfully created a new user");
      res.redirect("register");
    }).catch(err => console.log(err))
});


router.post("/deleteUser", upload.single("photo"), (req, res) => {
  // name, username, email, password, photo
  //console.log(req);
  Clerk.destroy({
    where: {
      id: req.body.id
    }
  }).then(() => {
    console.log("successsfully removed user: " + req.body.id);
    res.redirect("register"); // redirect back to the home page
  });

});

router.post("/updateUser", upload.single("photo"), (req, res) => {
  // name, username, email, password, photo
  //console.log(req);
  Clerk.update({
    mealName: req.body.mealName,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    meals_number: req.body.meals_number,
  }, {
    where: {
      id: req.body.id
    }
  }).then(() => {
    console.log("successfully updated name: " + req.body.id);
    res.redirect("register"); // redirect back to the home page
  });

});

module.exports = router;