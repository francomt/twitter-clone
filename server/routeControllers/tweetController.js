const Tweet = require("../db/models/tweetModel");
const User = require("../db/models/userModel");
const UserFollow = require("../db/models/userFollowModel");
const catchAsync = require("../utilities/catchAsync");
const APIFeatures = require("../utilities/apiFeatures");
const factory = require("../routeControllers/factory");
const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  accessKeyId: process.env.AWS_S3_ACCESS_ID,
  region: "us-east-1",
});

const s3 = new aws.S3();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image"), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "twitter-clonecopy",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `tweet-${crypto.randomBytes(20).toString("hex")}-${Date.now()}`); //use Date.now() for unique file keys
    },
  }),
  fileFilter: multerFilter,
});

exports.uploadTweetImages = upload.array("images", 4);

exports.resizeTweetPhoto = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.images = [];

    await Promise.all(
      req.files.map(async (file) => {
        req.body.images.push(file.location);
      })
    );
  }

  next();
});

exports.setTweetUser = (req, res, next) => {
  //Used for merge params to look up all tweets from a certain user
  if (req.params.id) {
    req.query.user = req.params.id;
  }

  //Used when creating a tweet so it belongs to logged in user
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.searchTweets = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tweet.find(), req.query)
    .regexFilter()
    .sort()
    .paginate();

  const tweets = await features.query;

  const search = new RegExp(req.query.text, "i");

  const totalResults = await Tweet.countDocuments({ text: search });

  res.status(200).json({
    status: "success",
    results: tweets.length,
    totalResults,
    data: {
      tweets,
    },
  });
});

exports.getAllTweets = catchAsync(async (req, res, next) => {
  let baseQuery = Tweet.find();

  //if request is for feed
  if (req.baseUrl.endsWith("feed")) {
    let user;

    if (req.params.id == req.user.id) {
      user = req.user;
    } else {
      user = await User.findById(req.params.id);
    }

    const followModelIds = user.following;

    const userFollows = await UserFollow.find().where("_id").in(followModelIds);

    const followIds = userFollows.map((e) => e.user.id);
    followIds.push(user.id);

    baseQuery = Tweet.find().where("user").in(followIds);
    req.query.sort = "-createdAt";
    delete req.query.user;
  }

  //For /:username on frontend
  if (req.baseUrl.endsWith("tweets") && req.params.id.length <= 15) {
    const user = await User.findOne({ username: req.params.id });
    req.query.user = user.id;
  }

  const features = new APIFeatures(baseQuery, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tweets = await features.query;

  res.status(200).json({
    status: "success",
    results: tweets.length,
    data: {
      tweets: tweets,
    },
  });
});
exports.getTweet = factory.getOne(Tweet);

exports.createTweet = catchAsync(async (req, res, next) => {
  let tweet = await Tweet.create(req.body);

  tweet = await tweet
    .populate("user", "email name username photo")
    .execPopulate();

  tweet.__v = undefined;

  res.status(201).json({
    status: "success",
    data: {
      tweet: tweet,
    },
  });
});

exports.likeTweet = catchAsync(async (req, res, next) => {
  let tweet = await Tweet.findById(req.params.tweetId);

  tweet.userLikes.push(req.body.user);
  tweet.likes++;
  await tweet.save();

  tweet = await tweet
    .populate("userLikes", "name username photo")
    .execPopulate();

  tweet.following = undefined;
  tweet.followers = undefined;

  res.status(201).json({
    status: "success",
    data: {
      tweet,
    },
  });
});

exports.unlikeTweet = catchAsync(async (req, res, next) => {
  const tweet = await Tweet.findByIdAndUpdate(
    req.params.tweetId,
    {
      $pull: { userLikes: req.body.user },
      $inc: { likes: -1 },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      tweet,
    },
  });
});

exports.deleteTweet = factory.deleteOne(Tweet);
