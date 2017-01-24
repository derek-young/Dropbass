'use strict'

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('bassdrop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

User.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

module.exports.user = User;
module.exports.db = sequelize;
