const User = require("../db/models/userModel");
const catchAsync = require("../utilities/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

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
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, username, password, passwordConfirm } = req.body;

  //Create user
  const newUser = await User.create({
    name,
    email,
    username,
    password,
    passwordConfirm,
  });

  newUser.__v = undefined;

  createAndSendToken(newUser, 201, req, res);
});

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
    user = await User.findOne({ email: userInfo }).select("+password");
  } else {
    user = await User.findOne({ username: userInfo }).select("+password");
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
