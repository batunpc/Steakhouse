const Sequelize = require("sequelize");
const db = require("../config/database");

//CLERK model
const Clerk = db.define("Administrator", {
  mealName: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  meals_number: Sequelize.INTEGER,
  photo: Sequelize.STRING,
});

module.exports = Clerk;
