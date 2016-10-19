'use strict';

const User    = require('../lib/user-helper');
const express = require('express');
const tweets  = express.Router();

// difference between express(), express.Router()
// http://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get

module.exports = function (db) { // db = dbMethods object(function) from db.js

  tweets.get('/', function (req, res) {
    let tweets = db.getTweets();

    // simulate delay
    setTimeout(function () { return res.json(tweets); }, 300);
  });

  tweets.post('/', function (req, res) {
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text,
      },
      created_at: Date.now(),
    };
    db.saveTweet(tweet);
    return res.send();
  });

  return tweets;

};
