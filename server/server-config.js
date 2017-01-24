'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./database.js').db;
const User = require('./database.js').user;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('../public'));

app.post('/signin', function(req, res, next) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.sendStatus(200);
    }
    return res.sendStatus(403);
  });
});

app.get('/authorized', function(req, res, next) {
  res.redirect('/');
});

module.exports = app;
