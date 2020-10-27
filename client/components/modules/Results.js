import React from "react";
import { Tweet, User } from "./index";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import {
  fetchLikeTweetSearch,
  fetchUnlikeTweetSearch,
  fetchDeleteTweetSearch,
} from "../../store/tweets";

import { fetchQuickFollow, fetchQuickUnfollow } from "../../store/profiles";

const Results = ({
  type,
  tweetResults,
  userResults,
  me,
  likeTweet,
  unlikeTweet,
  deleteTweet,
  loading,
  followUser,
  unfollowUser,
}) => {
  if (type === "latest") {
    if (tweetResults.data !== undefined) {
      return (
        <>
          {tweetResults.data.tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              me={me}
              tweet={tweet}
              likeTweet={likeTweet}
              unlikeTweet={unlikeTweet}
              deleteTweet={deleteTweet}
            />
          ))}
          {loading && (
            <Loader
              type="Oval"
              color="#1da1f2"
              height={40}
              width={40}
              style={{ margin: "25px" }}
            />
          )}
        </>
      );
    } else {
      return "";
    }
  } else if (type === "people") {
    if (userResults.data !== undefined) {
      return (
        <>
          {userResults.data.users.map((user) => (
            <User
              key={user.id}
              user={user}
              followUser={followUser}
              unfollowUser={unfollowUser}
              me={me}
            />
          ))}
          {loading && (
            <Loader
              type="Oval"
              color="#1da1f2"
              height={40}
              width={40}
              style={{ margin: "25px" }}
            />
          )}
        </>
      );
    } else {
      return "";
    }
  } else {
    return <p>Not Found</p>;
  }
};

const mapDispatch = (dispatch) => {
  return {
    likeTweet: (tweetId) => dispatch(fetchLikeTweetSearch(tweetId)),
    unlikeTweet: (tweetId) => dispatch(fetchUnlikeTweetSearch(tweetId)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweetSearch(tweetId)),
    followUser: (userId) => dispatch(fetchQuickFollow(userId)),
    unfollowUser: (meFollowing, profileFollower) =>
      dispatch(fetchQuickUnfollow(meFollowing, profileFollower)),
  };
};

export default connect(null, mapDispatch)(Results);
