'use strict';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const sassMiddleware = require('node-sass-middleware');

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.urlencoded({ extended: true }));

// serving static files (index.html etc) in express
// https://expressjs.com/en/starter/static-files.html
app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/../sass',
    dest: __dirname + '/../public/',
    debug: true,
    outputStyle: 'compressed',
  }));

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

app.listen(app.get('port'), () => {
  console.log('Example app listening on port ' + app.get('port'));
});
