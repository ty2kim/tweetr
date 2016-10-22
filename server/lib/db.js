'use strict';

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/tweeter';

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

let db;

MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {

  if (err) {
    console.log('Could not connect! Unexpected error. Details below.');
    throw err;
  }

  console.log('Connected to the database!');
  db = mongoInstance;
});

const dbMethods = {
  saveTweet: (data) => {
    db.collection('tweets').insert(data);
    return true;
  },

  getTweets: (cb) => {
    // why use callback
    // http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call?noredirect=1&lq=1
    db.collection('tweets').find().toArray((err, results) => {
      cb(results.sort(function (a, b) {
        return a.created_at - b.created_at;
      }));
    });
  },

  updateTweet: (id, likes) => {
    const query = { 'content.id': id };
    const set = { $set: { likes: likes } };
    db.collection('tweets').update(query, set);
    return true;
  },
};

function gracefulShutdown() {
  console.log('\nShutting down gracefully...');
  try {
    db.close();
  }
  catch (err) {
    throw err;
  }
  finally {
    console.log('Disconnecting from Mongo!');
    process.exit();
  }
}

process.on('SIGTERM', gracefulShutdown); // listen for TERM signal .e.g. kill
process.on('SIGINT', gracefulShutdown);  // listen for INT signal e.g. Ctrl-C

module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  },

};
