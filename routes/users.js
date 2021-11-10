const express = require("express");
const router = express.Router();
const db = require('../config/database')
const User = require('../models/User');
const {
  check,
  validationResult
} = require("express-validator");


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
    return new Promise((resolve, reject) => {
      User.findOne({ where: { email: email } })
      .then(emailExist => {
          if(emailExist !== null){
            reject(new Error('Email already exists.'))
          }else{
            resolve(true)
          }
      }).catch(err => console.log("Err:", err));
    })
  }),
  check("password_signup").notEmpty()
], 
(req,res) =>{
  console.log("AAAAAAA")
/*   const {email,password} = req.body 
 */
  const email = req.body.email
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let loginErr = [];
    User.findOne({
      where: email
    }).then((user)=>{
      if(user){
        loginErr.push({msg: "This email does not exist"})
        res.render("loginForm", {
          dataLogin:req.body,
          loginErr,
          layout: "login"
        });
      }
    }).catch(err => console.log("ERR: occured in login POST",err))
  }else if(errors.isEmpty()){
  db.sync().then(function () {
    res.render("loginForm", {
      title: "userForms",
      layout: "login"
    })
    .then(res.redirect(`/dashboard/${email}`))
    .catch(err => console.log("ERR: occured in login POST",err))
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
    console.log(users)
    //get user credentials list that registered
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
                    if(emailExist !== null){
                        reject(new Error('Email already exists.'))
                    }else{
                        resolve(true)
                    }
                })
                
            })
        }),
  check("password_signup").notEmpty()
], 
(req,res) =>{
  const {username, lastname, email , password_signup} = req.body 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
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
      password_signup:password_signup
    })
    .then(res.redirect(`/dashboard/${email}`))
    .catch(err => console.log(err))
    ;
  })
  }
})


module.exports = router;