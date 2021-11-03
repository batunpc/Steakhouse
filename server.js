const express = require("express");
const server = express();
const exphbs = require("express-handlebars");
const {check,validationResult} = require("express-validator");
const {
  appendFile
} = require("fs");


//parse incoming req aka middleware
server.use(express.urlencoded({extended: false}));
server.use(express.json());

//Static Files
server.use("/static", express.static(`${__dirname}/static`));
server.use("/scripts", express.static(`${__dirname}/scripts`));

//Templating Engine
server.set('view engine', ".hbs");
server.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: "main"
}));
//home
server.get("/", (req, res) => {
  res.render("home", {
    title: "home"
  })
});
//Meals Package
server.get("/mealPack", (req, res) => {
  res.render("mealPack", {
    title: "mealPack"
  })
});
//user forms aka login
server.get("/userForms", (req, res) => {
  res.render("userForms", {
    title: "userForms",
    layout: "register"
  })
});

server.post(
  "/userForms",
  [
    check("email").notEmpty(),
    check("password").notEmpty(),
  ],
  (req, res) => {
    var userLoginData = {
      email: req.body.email,
      password: req.body.password,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgs = errors.array();
      let emailError;
      let passwordError;

      if (errorMsgs.some((el) => el.param === "email")) {
        emailError = "Please enter your email address";
      }
      
      if (errorMsgs.some((el) => el.param === "password")) {
        passwordError = "Forgot your password ? ";
      }
      res.render("userForms", {
        errorMsgs,
        layout: "register",
        data: userLoginData,
        emailError,
        passwordError
      });
    } else if (errors.isEmpty()) {
      res.redirect(`/dashboard/${userLoginData.email}`);
    }
  }
);

server.get("/dashboard/:email/:fName?/:lName?", (req, res) => {
  let email = req.params.email;
  let fName = req.params.fName;
  let lName = req.params.lName;
  res.render("dashboard", {
    title: "Welcome",
    layout: "userProfile",
    email
  })
})

//err handling
server.use((req, res) => {
  res
    .status(404)
    .send(
      "<h3>The page you are looking for either misspelled or under construction :)</h3>"
    );
});

const HTTP_PORT = process.env.PORT || 8080;
server.listen(HTTP_PORT, (err) => {
  if (err)
    console.log(err)
  else
    console.log(`=> Server started on port | ${HTTP_PORT} |`);
});