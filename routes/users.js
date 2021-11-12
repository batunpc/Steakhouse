const express = require("express");
const router = express.Router();
const db = require('../config/database')
const User = require('../models/User');
const {
  check,
  validationResult
} = require("express-validator");


/////
// === LOGIN ===
router.get('/login', (req, res) =>
  User.findAll()
  .then(users => {
    res.render("client/loginForm", {
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
  const {email,username,password} = req.body 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let loginErr = [];
    User.findAll({where:{ 
      email: email,
      password: password
    }})
    .then((user)=>{
      if(user){
        loginErr.push({msg: "We cannot find an account with the provided credentials. Please create your account below"})
        res.render("client/loginForm", {
          dataLogin:req.body,
          loginErr,
          email,
          password,
          layout: "login"
        });
      }
    }).catch(err => console.log("ERR: occured in login POST",err))
  }else if(errors.isEmpty()){
    res.render("client/login_dashboard", {
      title: "Welcome_login",
      layout: "userProfile",
      username,
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
    res.render("client/registerForm", {
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
    let registerErr = [];
    User.findOne({
      where: {email}
    }).then((user)=>{
      if(user){
        registerErr.push({msg: "This email is already registered!"})
        res.render("client/registerForm", {
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
    .then(res.render("client/register_dashboard",{
      title: "Welcome_register",
      layout:"userProfile",
      username,
      lastname,
      email
    }))
    .catch(err => console.log(err))
  })
  }
})

module.exports = router;