'use strict';

const User    = require('../lib/user-helper');
const Tweet   = require('../lib/tweet-helper');
const express = require('express');
const tweets  = express.Router();

// difference between express(), express.Router()
// http://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get

module.exports = function (db) { // db = dbMethods object(function) from db.js

  tweets.get('/', function (req, res) {
    db.getTweets((data) => {
      res.json(data);
    });
  });

  tweets.post('/', function (req, res) {
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweetId = Tweet.generateRandomString();
    const tweet = {
      user: user,
      content:
      {
        id: tweetId,
        text: req.body.text,
      },
      created_at: Date.now(),
      likes: 0,
      liked_people: [],
    };
    db.saveTweet(tweet);
    return res.send();
  });

  tweets.put('/', function (req, res) {
    if (!req.body) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    var id = req.body.tweet_id;
    var likes = req.body.num_likes;
    db.updateTweet(id, likes);
    res.send();
  });

  return tweets;

};
