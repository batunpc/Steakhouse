const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const path = require("path");

const {check, validationResult} = require("express-validator");
const { json } = require("body-parser");
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //Middleware _aka:bodyparser

app.use("/static", express.static(__dirname + "/static"));
app.use("/scripts", express.static(__dirname + '/scripts'));

onHttpStart = () => {
  console.log("server listening on: " + HTTP_PORT);
};

//home
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/views/home.html"));
});

//Meals Package
app.get("/mealPack", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/views/mealPack.html"));
});

//todo login page & register
app.post("/userForms", (req , res) => {
  const userFormData = req.body;
  console.log(res.send(userFormData));
  console.log(json.stringify(userFormData));
})
app.get("/userForms", (req , res, next) => {
  res.status(200).sendFile(path.join(__dirname, "/views/userForms.html"));

});


app.get("/user-profile", (req , res) => {
  res.status(200).sendFile(path.join(__dirname, "/views/user-profile.html"));
});

//err handling
app.use((req, res) => {
  res
    .status(404)
    .send(
      "<h3>The page you are looking for either misspelled or under construction :)</h3>"
    );
}); 

app.listen(HTTP_PORT, onHttpStart);