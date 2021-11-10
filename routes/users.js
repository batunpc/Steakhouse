const express = require("express");
const router = express.Router();
const db = require('../config/database')
const User = require('../models/User');
const {
  check,
  validationResult
} = require("express-validator");

/////
// === DASHBOARD (user can see after register) ===
router.get('/dashboard', (req, res)=>{
  

})
/////
// === LOGIN ===
router.get('/login', (req, res) =>
  User.findAll()
  .then(users => {
    res.render("loginForm", {
      title: "userForms",
      layout: "login"
    })
  })
  .catch(err => console.log("ERR: occured in login GET\n",err))
);

router.post('/login', 
[ 
  check("email").notEmpty().custom(email=> {
    return new Promise((res, rej) => {
      User.findOne({ where: { email: email } })
      .then(emailExist => {
        if(emailExist !== null)
          res(true)
        else
          rej(new Error('email doesnt exist.'))
      }).catch(err => console.log(err));
    })
  }),
  check("password").notEmpty().custom(password => {
    return new Promise((res, rej) =>{
      User.findOne({ where: {password}})
      .then(passwordExist => {
        if (passwordExist !== null) 
          res(true)
        else rej(new Error('password doesnt exist.'))
      }).catch(err => console.log(err))
    })
  })
], 
(req,res) =>{
  const {email,password} = req.body 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let loginErr = [];
    User.findAll({where:{ 
      email: email,
      password: password
    }})
    .then((user)=>{
      if(user){
        loginErr.push({msg: "Invalid entry credentials does not exist"})
        res.render("loginForm", {
          dataLogin:req.body,
          loginErr,
          email,
          password,
          layout: "login"
        });
      }
    }).catch(err => console.log("ERR: occured in login POST",err))
  }else if(errors.isEmpty()){
    res.render("dashboard", {
      title: "Welcome",
      layout: "userProfile",
      email
    })
  }
})

/////
// === REGISTER ===
//add users -register
router.get('/register', (req, res) =>
  User.findAll()
  .then(users => {
    res.render("registerForm", {
      title: "userForms",
      layout: "register"
    })
    console.log(users) // lists all registered users to console
  })
  .catch(err => console.log(err))
);

//add users -register
router.post('/register', 
[  
  check("email").notEmpty().custom(userEmail=> {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { email: userEmail } })
        .then(emailExist => {
        if(emailExist !== null)
          reject(new Error('Email already exists.'))
        else
          resolve(true)
        })
    })
  }),
  check("password").notEmpty()
], 
(req,res) =>{
  const {username, lastname, email , password} = req.body 
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.log('=>', email, password)
    console.log("YABADABA")
    let registerErr = [];
    User.findOne({
      where: {email}
    }).then((user)=>{
      if(user){
        registerErr.push({msg: "This email is already registered!"})
        res.render("registerForm", {
          data:req.body,
          registerErr,
          layout: "register"
        });
      }
    })
  }else if(errors.isEmpty()){
      //insert into table
  db.sync().then(function () {
    User.create({
      username:username,
      lastname:lastname,
      email:email,
      password:password
    })
    .then(res.render("dashboard",{
      layout:"userProfile",
      email
    }))
    .catch(err => console.log(err))
  })
  }
})

module.exports = router;