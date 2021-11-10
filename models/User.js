const Sequelize = require('sequelize');
const db = require('../config/database')

//USER model
const User = db.define('Customer', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  //disabling default behavior
  createdAt: false,
  updatedAt: false
})


module.exports = User;

