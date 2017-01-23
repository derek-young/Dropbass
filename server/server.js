'use strict'

const app = require('./server-config.js');
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  console.log('Received a ' + req.method + ' request to ' + req.url);
  next();
})

app.listen(port, function() {
  console.log('Listening on : ' + port);
});
