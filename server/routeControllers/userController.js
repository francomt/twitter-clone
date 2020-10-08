const User = require('../db/models/userModel');
const UserFollow = require('../db/models/userFollowModel');
const factory = require('./factory');
const catchAsync = require('../utilities/catchAsync');

exports.getAllUsers = factory.getAll(User);

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate('following', '-__v')
    .populate('followers', '-__v');
  if (!user)
    return next(new Error(`No User found with the ID: ${req.params.id}`));

  res.status(200).json({
    status: 'success',
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

  if (!following) next(new Error('Following account does not exist'));

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
    status: 'success',
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
    status: 'success',
  });
});
