'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const helpers = require('./http-helpers.js');
const User = require('./database.js').user;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('../public'));

app.get('/api/songs', function(req, res, next) {
  helpers.getSongs(res);
});

app.get('/authorized', function(req, res, next) {
  res.redirect('/');
});

app.get('/dropbox/*', function(req, res, next) {
  const path = req.url.substring(8, req.url.length);
  if (path.length > 0) {
    helpers.download(path, res);
  }
});

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

module.exports = app;
