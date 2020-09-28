const User = require('../db/models/userModel');
const catchAsync = require('../utilities/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

//CREATES TOKEN SIGNATURE
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//CREATE AND SEND TOKEN
const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //Only secure in production
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //Don't show password in response
  user.password = undefined;

  //Send back token and user
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

//CREATE NEW USER BY SIGNUP AND ASSIGN JWT TOKEN
exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, firstName, lastName } = req.body;

  //Create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  createAndSendToken(newUser, 201, res);
});

//LOGIN USER
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password are in req.body
  if (!email || !password) {
    return next(new Error('Please provide email and password'));
  }

  //Check if user exists
  const user = await User.findOne({ email }).select('+password');

  //Check if password is correct
  if (!user || (await user.correctPassword(password, user.password))) {
    return next(new Error('Incorrect email or password'));
  }

  createAndSendToken(user, 200, res);
});

//PROTECT MIDDLEWARE
exports.protect = catchAsync(async (req, res, next) => {
  //Check for token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //[0] = 'Bearer' and then grab the token at [1]
    token = req.headers.authorization.split(' ')[1];
  }

  //If no token, not logged in
  if (!token) return next(new Error('You are not logged in'));

  //Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const currentUser = await User.findById(decoded.id);

  //If user does not exist return error
  if (!currentUser) return next(new Error('This user no longer exists'));

  //Check if user changed password after JWT issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new Error('User recently changed password. Please log in again')
    );

  //Add user to req
  req.user = currentUser;
  //Grant access to protected route
  next();
});
