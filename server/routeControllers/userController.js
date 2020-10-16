const User = require("../db/models/userModel");
const UserFollow = require("../db/models/userFollowModel");
const factory = require("./factory");
const catchAsync = require("../utilities/catchAsync");
const APIFeatures = require("../utilities/apiFeatures");
const multer = require("multer");
const sharp = require("sharp");

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

exports.uploadUserPhoto = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "coverImg", maxCount: 1 },
]);

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (req.files.photo) {
    //Photo
    req.body.photo = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.files.photo[0].buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.body.photo}`);
  }

  if (req.files.coverImg) {
    //CoverImg
    req.body.coverImg = `user-${req.user.id}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.coverImg[0].buffer)
      .resize(1000, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/cover/${req.body.coverImg}`);
  }
  next();
});

exports.getAllUsers = factory.getAll(User);

exports.searchUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    User.find().select("name username photo"),
    req.query
  )
    .regexFilter()
    .sort()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      users: doc,
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
  const userFollower = await UserFollow.create({ user: currentUser.id });

  //User2 is created as a follow with reference to User1's follow
  const userFollowing = await UserFollow.create({
    user: following.id,
    followingId: userFollower.id,
  });

  //User2 is pushed into User1's FOLLOWING list
  currentUser.following.push(userFollowing);

  //User1 is pushed into User2's FOLLOWER list
  following.followers.push(userFollower);

  await currentUser.save();
  await following.save();

  res.status(201).json({
    status: "success",
    data: {
      user: currentUser,
    },
  });
});

exports.unfollowUser = catchAsync(async (req, res, next) => {
  //Deletes reference from both User1's FOLLOWING list and User2's FOLLOWERS list
  await UserFollow.findByIdAndDelete(req.body.followingId);
  await UserFollow.findByIdAndDelete(req.body.id);

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
