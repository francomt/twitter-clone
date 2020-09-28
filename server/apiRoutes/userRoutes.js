const express = require('express');
const router = express.Router();

//controllers
const userController = require('../routeControllers/userController');
const authController = require('../routeControllers/authController');

router.get('/', authController.protect, userController.getAllUsers);

module.exports = router;
