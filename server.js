const express = require("express");
const exphbs = require("express-handlebars");
const server = express();
const User =require("./config/database")
const session = require('express-session')

//Static Files
server.use("/static", express.static(`${__dirname}/static`));
server.use("/scripts", express.static(`${__dirname}/scripts`));
//Database and test
const db = require('./config/database')
db
.authenticate()
.then(function() {
  console.log('=> Connected to Database 👾');
})
.catch(function(err) {
  console.log('=> Unable to connect to the database:', err);
});

// data parsing middleware
// Parse application/x-www-form-urlencoded
server.use(express.urlencoded({extended: false}));
server.use(express.json());

// Handlebars middleware
server.set('view engine', ".hbs");
server.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: "main"
}));
//express-sessions
server.use(session({
  secret:"mysecret",
  resave:false,
  saveUninitialized:true
}))
//locals
server.use((req, res, next)=>{
  //every hbs file will have access to User and session variable
  res.locals.User=req.session.User;
  res.locals.session=req.session;
  next();
})

// main routes
server.use('/', require('./routes/main'))
// User form routes
server.use('/users', require('./routes/users'))
//administrator routes
server.use('/clerk', require('./routes/clerks'))


//err handling
server.use((req, res) => {
  res
    .status(404)
    .send(
      "<i>something broke :/</i>"
    );
});
//port
const HTTP_PORT = process.env.PORT || 8080;
server.listen(HTTP_PORT, (err) => {
  if (err)
    console.log(err)
  else
    console.log(`=> Server started on port | ${HTTP_PORT} |`);
});