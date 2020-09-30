const express = require('express');
const tweetController = require('../routeControllers/tweetController');
const authController = require('../routeControllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get('/', tweetController.setTweetUser, tweetController.getAllTweets);
router.post('/', tweetController.setTweetUser, tweetController.createTweet);

router.get('/:id', tweetController.getTweet);

module.exports = router;
