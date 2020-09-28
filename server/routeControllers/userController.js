const User = require('../db/models/userModel');
const factory = require('./factory');

exports.getAllUsers = factory.getAll(User);
