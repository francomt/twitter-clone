const User = require("../db/models/userModel");
const UserFollow = require("../db/models/userFollowModel");
const factory = require("./factory");
const catchAsync = require("../utilities/catchAsync");
const APIFeatures = require("../utilities/apiFeatures");
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

exports.uploadUserPhoto = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "coverImg", maxCount: 1 },
]);

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (req.files.photo) {
    //Photo
    req.body.photo = req.files.photo[0].location;
  }

  if (req.files.coverImg) {
    //CoverImg
    req.body.coverImg = req.files.coverImg[0].location;
  }
  next();
});

exports.getAllUsers = factory.getAll(User);

exports.searchUsers = catchAsync(async (req, res, next) => {
  const search = new RegExp(req.query.username, "i");

  const features = new APIFeatures(
    User.find({ $or: [{ username: search }, { name: search }] }).select(
      "name username photo bio following followers"
    ),
    req.query
  )
    .sort()
    .paginate();

  const doc = await features.query;

  const totalResults = await User.countDocuments({
    $or: [{ username: search }, { name: search }],
  });

  res.status(200).json({
    status: "success",
    results: doc.length,
    totalResults,
    data: {
      users: doc,
    },
  });
});

exports.getFollowing = catchAsync(async (req, res, next) => {
  const doc = await User.find({ username: req.params.id }).populate(
    "following followers"
  );

  const followingIds = doc[0].following.map((follow) => {
    return follow.user.id;
  });

  const followerIds = doc[0].followers.map((follow) => {
    return follow.user.id;
  });

  const following = await User.find({ _id: followingIds }).select(
    "name username photo bio following followers"
  );

  const followers = await User.find({ _id: followerIds }).select(
    "name username photo bio following followers"
  );

  res.status(200).json({
    status: "success",
    data: {
      user: { ...doc[0]._doc, following, followers },
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  let query;

  if (req.params.id.length <= 15) {
    query = User.findOne({ username: req.params.id });
  } else {
    query = User.findById(req.params.id);
  }

  const user = await query
    .populate("following", "-__v")
    .populate("followers", "-__v");
  if (!user)
    return next(new Error(`No User found with the ID: ${req.params.id}`));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.followUser = catchAsync(async (req, res, next) => {
  //logged in user ex. User1
  const currentUser = await User.findById(req.user.id); //User1

  //User1 wants to follow this user ex. User2
  const following = await User.findById(req.params.id); //User2

  if (!following) next(new Error("Following account does not exist"));

  //User1 is created as a follower
  let userFollower = await UserFollow.create({ user: currentUser.id });

  //User2 is created as a follow with reference to User1's follow
  let userFollowing = await UserFollow.create({
    user: following.id,
    followingId: userFollower.id,
  });

  //User2 is pushed into User1's FOLLOWING list
  currentUser.following.push(userFollowing);

  //User1 is pushed into User2's FOLLOWER list
  following.followers.push(userFollower);

  userFollower = await userFollower
    .populate("user", "name photo username")
    .execPopulate();

  userFollowing = await userFollowing
    .populate("user", "name photo username")
    .execPopulate();

  await currentUser.save();
  await following.save();

  res.status(201).json({
    status: "success",
    data: {
      me: userFollowing,
      follow: userFollower,
    },
  });
});

exports.unfollowUser = catchAsync(async (req, res, next) => {
  //Deletes reference from both User1's FOLLOWING list and User2's FOLLOWERS list

  await UserFollow.findByIdAndDelete(req.body.followingId);
  await UserFollow.findByIdAndDelete(req.body.followingIdTwo);

  res.status(204).json({
    status: "success",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const query = {};

  if (req.body.name) query.name = req.body.name;
  if (req.body.bio) query.bio = req.body.bio;
  if (req.body.photo !== "undefined") query.photo = req.body.photo;
  if (req.body.coverImg !== "undefined") query.coverImg = req.body.coverImg;

  const user = await User.findByIdAndUpdate(req.params.id, query, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
