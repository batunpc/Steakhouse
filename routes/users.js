const express = require("express");
const router = express.Router();
const db = require('../config/database')
const User = require('../models/User');
const {check,validationResult} = require("express-validator");


//get user credentials list
router.get('/',(req,res) => 
  User.findAll()
  .then(users => {
    res.render("userForms", {
      title: "userForms",
      layout: "register"
    }) 
      console.log(users)
  })
  .catch(err => console.log(err)) 
); 

//add users
router.post('/', 
[  
  check("username").notEmpty(),
  check("lastname").notEmpty(),
  check("email").notEmpty(),
  check("password_signup").notEmpty(),
], 
  (req,res) =>{
    var userLoginData = {
      username:req.body.username,
      lastname:req.body.lastname,
      email: req.body.email,
      password_signup: req.body.password_signup,
    };
  let {username, lastname, email , password_signup} =req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("userForms", {
      username,
      lastname,
      email,
      password_signup,
      data:userLoginData,
      layout: "register"
    })
  }else if(errors.isEmpty()){
      //insert into table
  db.sync().then(function () {
    User.create({
      username:username,
      lastname:lastname,
      email:email,
      password_signup:password_signup
    })
    .then(res.redirect(`/dashboard/${userLoginData.email}`))
    .catch(err => console.log(err))
    ;
  })
  }
})
module.exports = router;