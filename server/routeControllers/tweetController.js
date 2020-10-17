const Tweet = require("../db/models/tweetModel");
const User = require("../db/models/userModel");
const UserFollow = require("../db/models/userFollowModel");
const catchAsync = require("../utilities/catchAsync");
const APIFeatures = require("../utilities/apiFeatures");
const factory = require("../routeControllers/factory");
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTweetImages = upload.array("images", 4);

exports.resizeTweetPhoto = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.images = [];

    await Promise.all(
      req.files.map(async (file) => {
        const fileName = `tweet-${crypto
          .randomBytes(20)
          .toString("hex")}-${Date.now()}.jpeg`;

        await sharp(file.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 65 })
          .toFile(`public/img/tweets/${fileName}`);

        req.body.images.push(fileName);
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

  res.status(200).json({
    status: "success",
    results: tweets.length,
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
  let doc = await Tweet.create(req.body);

  doc = await doc.populate("user", "email name username photo").execPopulate();

  doc.__v = undefined;

  res.status(201).json({
    status: "success",
    data: {
      tweet: doc,
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
