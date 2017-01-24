'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database.js');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('../public'));

app.post('/signin', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
});

app.get('/authorized', function(req, res, next) {
  res.redirect('/');
});

module.exports = app;
