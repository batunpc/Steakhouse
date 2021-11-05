const express = require("express");
const exphbs = require("express-handlebars");
const {check,validationResult} = require("express-validator");

const server = express();
//Static Files
server.use("/static", express.static(`${__dirname}/static`));
server.use("/scripts", express.static(`${__dirname}/scripts`));

//Database
const db = require('./config/database')
// Test DB
db
.authenticate()
.then(function() {
  console.log('=> Connection has been established successfully.');
})
.catch(function(err) {
  console.log('Unable to connect to the database:', err);
});

// data parsing middleware
server.use(express.urlencoded({extended: false}));
server.use(express.json());

// Handlebars middleware
server.set('view engine', ".hbs");
server.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: "main"
}));

// User routes
server.use('/userForms', require('./routes/users'))



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
      "<i>something broke :/</i>"
    );
});

const HTTP_PORT = process.env.PORT || 8080;
server.listen(HTTP_PORT, (err) => {
  if (err)
    console.log(err)
  else
    console.log(`=> Server started on port | ${HTTP_PORT} |`);
});