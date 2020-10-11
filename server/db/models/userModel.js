const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already in use'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    username: {
      type: String,
      required: true,
      unique: [true, 'Username already in use'],
      validate: {
        validator: /^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        message: "Username must be between 4-15 characters, can only contain letters and numbers, cannot contain consecutive _ or . at the beginning or end."
      }
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm password'],
      select: false,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    profilePicture: {
      type: String,
    },
    privateAccount: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    activeAccount: {
      type: Boolean,
      default: true,
      select: false,
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: 'UserFollow' }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'UserFollow' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


//////////////////////////
// PRE SAVE MIDDLEWARE //
////////////////////////

//Hashing password pre-save
userSchema.pre('save', async function (next) {
  //Only run this function is password was saved or modified
  if (!this.isModified('password')) return next();

  //Hash password with cost of 12 and set it as the password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

//If password is changed, update passwordChangedAt
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
});

//////////////////////////
// PRE FIND MIDDLEWARE //
////////////////////////

//Hides inactive users from results
userSchema.pre(/^find/, function (next) {
  this.find({ activeAccount: { $ne: false } });

  next();
});

//////////////////////////
// INSTANCE METHODS /////
////////////////////////

//Compares inputted password and instance password
userSchema.methods.correctPassword = async function (inputtedPass, userPass) {
  return await bcrypt.compare(inputtedPass, userPass);
};

//Check if password was changed after being issued JWT
userSchema.methods.changedPasswordAfter = function (timestampJWT) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //If password was changed after being issued JTW, return true
    return timestampJWT < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
