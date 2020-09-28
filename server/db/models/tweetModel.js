const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'A tweet must have a least 1 character'],
      max: 280,
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Tweet must belong to a user'],
      },
    ],
  },
  //This allows virtual properties to appear in output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//PRE-FIND MIDDLEWARE

//Runs on any find query
tweetSchema.pre(/^find/, function (next) {
  this.populate('user', 'username name');

  next();
});
