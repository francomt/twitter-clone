const express = require('express');
const router = express.Router();
//Routers
const tweetRouter = require('./tweetRoutes');

//controllers
const userController = require('../routeControllers/userController');
const authController = require('../routeControllers/authController');

//Redirect to Tweet Router
router.use('/:id/tweets', tweetRouter);

router.get('/', authController.protect, userController.getAllUsers);

router.get('/:id', authController.protect, userController.getUser);

module.exports = router;
