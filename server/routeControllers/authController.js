const catchAsync = require('../utilities/catchAsync');
const User = require('../db/models/userModel');

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, firstName, lastName } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    type: 'sucess',
    data: newUser,
  });
});
