const mongoose = require("mongoose");

const userFollowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  followingId: String,
  followedAt: {
    type: Date,
    default: Date.now(),
  },
});

userFollowSchema.pre(/^find/, async function (next) {
  this.populate("user", "name username photo bio");
  next();
});

const UserFollow = mongoose.model("UserFollow", userFollowSchema);

module.exports = UserFollow;
