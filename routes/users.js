const express = require("express");
const router = express.Router();
const db = require('../config/database')
const User = require('../models/User');
const {
  check,
  validationResult
} = require("express-validator");


//get user credentials list
router.get('/', (req, res) =>
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

//add users -register
router.post('/', 
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
        res.render("userForms", {
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