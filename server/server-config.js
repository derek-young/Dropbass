'use strict'

const express = require('express');
const app = express();

app.use(express.static('../public'));

app.post('/signin', function(req, res, next) {
  res.sendStatus(200);
});

app.get('/authorized', function(req, res, next) {
  res.redirect('/');
});

module.exports = app;
