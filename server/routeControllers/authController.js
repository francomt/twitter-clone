const User = require("../db/models/userModel");
const UserFollow = require("../db/models/userFollowModel");
const catchAsync = require("../utilities/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const error = `${field} already in use.`;
  res.json({ message: error, fields: field });
};

//CREATES TOKEN SIGNATURE
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//CREATE AND SEND TOKEN
const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.get("x-forwarded-proto") === "https",
  });

  //Don't show password in response
  user.password = undefined;

  //Send back token and user
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

//CREATE NEW USER BY SIGNUP AND ASSIGN JWT TOKEN
exports.signup = async (req, res, next) => {
  try {
    const { name, email, username, password, passwordConfirm } = req.body;

    const usernameVal = username.toLowerCase();

    //Create user
    let currentUser = await User.create({
      name,
      email,
      username: usernameVal,
      password,
      passwordConfirm,
    });

    //FOLLOW ACCOUNT

    //User1 wants to follow this user ex. User2
    const following = await User.findById("5fbbfd7c87b2a200171a3d79"); //User2

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

    ///////////////////
    // Follow owner

    const owner = await User.findById("5fb567e38a9db20017b6f304");

    let userFollowerOwner = await UserFollow.create({ user: currentUser.id });

    let userFollowingOwner = await UserFollow.create({
      user: owner.id,
      followingId: userFollowerOwner.id,
    });

    //Owner is pushed into User1's FOLLOWING list
    currentUser.following.push(userFollowingOwner);

    //User1 is pushed into Owners's FOLLOWER list
    owner.followers.push(userFollowerOwner);

    currentUser.markModified("following");
    following.markModified("followers");
    owner.markModified("followers");

    try {
      await currentUser.save({ validateBeforeSave: false });
      await following.save({ validateBeforeSave: false });
      await owner.save({ validateBeforeSave: false });
    } catch (error) {
      console.log(error);
    }

    currentUser = await currentUser
      .populate("following")
      .populate("followers")
      .execPopulate();

    createAndSendToken(currentUser, 201, req, res);
  } catch (error) {
    handleDuplicateKeyError(error, res);
  }
};

//LOGIN USER
exports.login = catchAsync(async (req, res, next) => {
  const { userInfo, password } = req.body;

  //Check if email and password are in req.body
  if (!userInfo || !password) {
    return res.json({
      status: "failed",
      message: "Please provide both email/username and password",
    });
  }

  let user;

  //Check if user exists
  if (userInfo.includes("@")) {
    user = await User.findOne({ email: userInfo })
      .select("+password")
      .populate("following", "-__v")
      .populate("followers", "-__v");
  } else {
    user = await User.findOne({ username: userInfo.toLowerCase() })
      .select("+password")
      .populate("following", "-__v")
      .populate("followers", "-__v");
  }

  if (!user) {
    return res.json({
      status: "failed",
      message:
        "The email/username and password you entered did not match our records. Please double-check and try again.",
    });
  }

  //Check if password is correct
  const correct = await user.correctPassword(password, user.password);

  if (!correct) {
    return res.json({
      status: "failed",
      message:
        "The email/username and password you entered did not match our records. Please double-check and try again.",
    });
  }

  user.__v = undefined;

  createAndSendToken(user, 200, req, res);
});

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");

  res.status(200).json({
    status: "success",
  });
};

//PROTECT MIDDLEWARE
exports.protect = catchAsync(async (req, res, next) => {
  //Check for token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //[0] = 'Bearer' and then grab the token at [1]
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  //If no token, not logged in
  if (!token) {
    return res.json({});
  }

  //Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const currentUser = await User.findById(decoded.id);

  //If user does not exist return error
  if (!currentUser) return next(new Error("This user no longer exists"));

  //Check if user changed password after JWT issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new Error("User recently changed password. Please log in again")
    );

  //Add user to req
  req.user = currentUser;
  //Grant access to protected route
  next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  const me = await User.findById(req.user.id)
    .populate("following", "-__v")
    .populate("followers", "-__v");

  res.status(200).json({
    status: "success",
    data: {
      me,
    },
  });
});
