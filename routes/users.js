const express = require("express");
const router = express.Router();
const db = require('../config/database')
const User = require('../models/User');
const {
  check,
  validationResult
} = require("express-validator");
const session = require('express-session')

router.use(express.urlencoded({ extended: false }));

router.use(session({
  secret:"mysecret",
  resave:false,
  saveUninitialized:true
}))

///////////////////////////////////////
// === REGISTER VALIDATION ===
router.get('/register', (req, res) =>
  User.findAll()
  .then(users => {
    res.render("client/registerForm", {
      title: "userForms",
      layout: "forms"
    })
    //console.log(users) // lists all registered users to console
  })
  .catch(err => console.log(err))
);

router.post('/register',
  [check("is_admin").notEmpty(),
    check("email").notEmpty().custom(userEmail => {
      return new Promise((resolve, reject) => {
        User.findOne({
            where: {
              email: userEmail
            }
          })
          .then(emailExist => {
            if (emailExist !== null)
              reject(new Error('Email already exists.'))
            else
              resolve(true)
          })
      })
    }),
    check("password").notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    const {username,lastname,email,password, is_admin} = req.body
    let userTypeErr = [];
    let registerErr = [];

    if (!errors.isEmpty()) {
      User.findOne({
        where: {
          email
        }
      }).then((user_email) => {
        if (user_email) {
          registerErr.push({
            msg: "Provided email has already registered"
          })
          res.render("client/registerForm", {
            data: req.body,
            registerErr,
            layout: "forms"
          });
        } else if (is_admin != "admin" && is_admin != "client") {
          userTypeErr.push({
            msg: "Please select your position to proceed"
          });
          res.render("client/registerForm", {
            data: req.body,
            userTypeErr,
            layout: "forms"
          });
        }
      })
    } else if (errors.isEmpty()) {
      let isAdminToBool;
      if (is_admin == "admin") 
        isAdminToBool = true;
      else if (is_admin == "client") 
        isAdminToBool = false;
  
      db.sync().then(function () {
        User.create({
            username: username,
            lastname: lastname,
            email: email,
            password: password,
            is_admin: isAdminToBool,
        }).then((userSaved)=>{
          console.log(`=> User ${userSaved.username} has registered`)
          req.session.User=userSaved;
          res.redirect("registeredProfile")
        }).catch((error)=>{
          console.log(`\n= User cannot register =\n error: ${error}`)
        })
      }).catch(err => console.log(err))
    }
})
router.get('/registeredProfile', (req, res)=>{
  var userSaved = req.session.User;
  res.render("client/register_dashboard", {
    title: "Welcome_profile",
    layout: "forms",
    userSaved
  })
})

////////////////////////////////////
// === LOGIN VALIDATION ===
router.get('/login', (req, res) =>
  User.findAll()
  .then(users => {
    res.render("client/loginForm", {
      title: "userForms",
      layout: "forms"
    })
  })
  .catch(err => console.log("ERR: occured in login GET\n", err))
);

router.post('/login',
  [
    check("email").notEmpty().custom(email => {
      return new Promise((res, rej) => {
        User.findOne({
            where: {
              email: email
            }
          })
          .then(emailExist => {
            if (emailExist !== null)
              res(true)
            else
              rej(new Error('email doesnt exist.'))
          }).catch(err => console.log(err));
      })
    }),
    check("password").notEmpty().custom(password => {
      return new Promise((res, rej) => {
        User.findOne({
            where: {
              password
            }
          })
          .then(passwordExist => {
            if (passwordExist !== null)
              res(true)
            else rej(new Error('password doesnt exist.'))
          }).catch(err => console.log(err))
      })
    })
  ],
  (req, res) => {
    const {email,username,password} = req.body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let loginErr = [];
      User.findAll({
          where: {
            email: email,
            password: password
          }
        })
        .then((user) => {
          if (user) {
            loginErr.push({
              msg: "We cannot find an account with the provided credentials. Please create your account below"
            })
            res.render("client/loginForm", {
              dataLogin: req.body,
              loginErr,
              email,
              password,
              layout: "forms"
            });
          }
        }).catch(err => console.log(err))
    }else if (errors.isEmpty()) {
      User.findOne({
        where: {
          email: email,
        }}).then((userlogin)=>{
          if (userlogin) {
            console.log(`User logged in with username: ${userlogin.email}`)
            req.session.User = userlogin;
            res.redirect('loginDashboard')
          }
      })
    }
  })

router.get('/loginDashboard', (req, res)=>{
  var userlogin = req.session.User
  res.render('client/login_dashboard',{
    title:`Dashboard`,
    layout:"forms",
    userlogin
  })
})  

router.get('/logout', (req, res)=>{
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;