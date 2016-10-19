'use strict';

const PORT        = 8080;
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

app.use(bodyParser.urlencoded({ extended: true }));

// serving static files (index.html etc) in express
// https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// db.connect = function(onConnect) { onConnect(dbMethods); }
// something = function(dbInstance) { tweetsApi(dbInstance); }
// db.connect((dbInstance) => {...}) = db.connect(something)
// db.connect(something) = something(dbMethods)
// something(dbMethods) = tweetsApi(dbMethods)
db.connect((dbInstance) => {
  // app.use() to mount router with root set to '/tweets'
  // http://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
  app.use('/tweets', tweetsApi(dbInstance));
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
