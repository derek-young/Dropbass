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

sequelize.sync({force: true}).then(function() {
  return User.create({
    username: 'dthomasy@gmail.com',
    password: 'young'
  });
}).then(function(user) {
  console.log(user);
});

module.exports = sequelize;
