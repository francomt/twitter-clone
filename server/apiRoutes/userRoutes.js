const express = require('express');
const router = express.Router();
//Routers
const tweetRouter = require('./tweetRoutes');

//controllers
const userController = require('../routeControllers/userController');
const authController = require('../routeControllers/authController');

//Redirect to Tweet Router
router.use('/:id/tweets', tweetRouter);
router.use('/:id/feed', tweetRouter);

router.use(authController.protect);

router.get('/', userController.getAllUsers);

router.delete('/unfollow', userController.unfollowUser);

router.get('/:id', userController.getUser);

router.post('/:id/follow', userController.followUser);

module.exports = router;
