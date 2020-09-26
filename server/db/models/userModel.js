const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
    select: false,
    validate: function (val) {
      return val === this.password;
    },
  },
  profilePicture: {
    type: String,
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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
