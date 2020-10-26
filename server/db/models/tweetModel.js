const mongoose = require("mongoose");
const User = require("./userModel");
// const arrayUniquePlugin = require("mongoose-unique-array");

const tweetSchema = mongoose.Schema(
  {
    text: {
      type: String,
      max: 280,
    },
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Tweet must belong to a user"],
    },
    images: [String],
    userLikes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  //This allows virtual properties to appear in output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { currentTime: () => Date.now() },
  }
);

// tweetSchema.plugin(arrayUniquePlugin);

//PRE-FIND MIDDLEWARE

//Runs on any find query
tweetSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name username photo",
    model: User,
  }).populate({
    path: "userLikes",
    select: "name username photo",
    model: User,
  });

  next();
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
