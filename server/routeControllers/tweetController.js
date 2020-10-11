const Tweet = require('../db/models/tweetModel');
const User = require('../db/models/userModel');
const UserFollow = require('../db/models/userFollowModel');
const catchAsync = require('../utilities/catchAsync');
const APIFeatures = require('../utilities/apiFeatures');
const factory = require('../routeControllers/factory');

exports.setTweetUser = (req, res, next) => {
  //Used for merge params to look up all tweets from a certain user
  if (req.params.id) {
    req.query.user = req.params.id;
  }

  //Used when creating a tweet so it belongs to logged in user
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllTweets = catchAsync(async (req, res, next) => {
  let baseQuery = Tweet.find();

  //if request is for feed
  if (req.baseUrl.endsWith('feed')) {
    
    let user;

    if (req.params.id == req.user.id) {
      user = req.user;
    } else {
      user = await User.findById(req.params.id);
    }

    const followModelIds = user.following;

    const userFollows = await UserFollow.find().where('_id').in(followModelIds);

    const followIds = userFollows.map((e) => e.user.id);
    followIds.push(user.id);

    baseQuery = Tweet.find().where('user').in(followIds);
    req.query.sort = '-createdAt';
    delete req.query.user;
  }

  //For /:username on frontend
  if (req.baseUrl.endsWith('tweets') && req.params.id.length <= 15) {
    const user = await User.findOne({username: req.params.id})
    req.query.user = user.id
  }



  const features = new APIFeatures(baseQuery, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tweets = await features.query;

  res.status(200).json({
    status: 'success',
    results: tweets.length,
    data: {
      tweets: tweets,
    },
  });
});
exports.getTweet = factory.getOne(Tweet);
exports.createTweet = factory.createOne(Tweet);
