const Tweet = require('../db/models/tweetModel');
const factory = require('../routeControllers/factory');

exports.setTweetUser = (req, res, next) => {
  //Used for merge params to look up all tweets from a certain user
  if (req.params.id) {
    req.query.user = req.user.id;
  }

  //Used when creating a tweet so it belongs to logged in user
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllTweets = factory.getAll(Tweet);
exports.getTweet = factory.getOne(Tweet);
exports.createTweet = factory.createOne(Tweet);
