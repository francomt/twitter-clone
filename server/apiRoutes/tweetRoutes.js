const express = require("express");
const tweetController = require("../routeControllers/tweetController");
const authController = require("../routeControllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get("/", tweetController.setTweetUser, tweetController.getAllTweets);
router.post(
  "/",
  tweetController.setTweetUser,
  tweetController.uploadTweetImages,
  tweetController.resizeTweetPhoto,
  tweetController.createTweet
);

router.get("/search", tweetController.searchTweets);

router.get("/:id", tweetController.getTweet);
router.delete("/:id", tweetController.deleteTweet);

router.post(
  "/like/:tweetId",
  tweetController.setTweetUser,
  tweetController.likeTweet
);

router.post(
  "/unlike/:tweetId",
  tweetController.setTweetUser,
  tweetController.unlikeTweet
);

module.exports = router;
