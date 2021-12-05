const Sequelize = require('sequelize');
const db = require('../config/database')
const bcrypt = require('bcrypt');
//USER model
const User = db.define('User', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  is_admin: Sequelize.BOOLEAN,
})
//TODO: work on this
bcrypt.genSalt(10).then(
  (salt)=>{
    bcrypt.hash(User.password,salt).then((encryptedPassw)=>{
      User.password = encryptedPassw;
      next();
    }).catch(err => console.log(err))
  }
).catch(err => console.log(err))
module.exports = User;

