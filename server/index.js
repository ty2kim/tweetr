'use strict';

const PORT        = 8080;
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

// db = { connect: (onConnect) => { onConnect(dbMethods); } }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

db.connect((dbInstance) => {
  app.use('/tweets', tweetsApi(dbInstance));
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
