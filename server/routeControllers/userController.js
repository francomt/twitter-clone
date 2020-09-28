const User = require('../db/models/userModel');
const catchAsync = require('../utilities/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      users: allUsers,
    },
  });
});
