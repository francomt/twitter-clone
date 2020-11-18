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
  query,
}) => {
  if (type === "latest") {
    if (tweetResults.data !== undefined && tweetResults.results > 0) {
      return (
        <>
          {tweetResults.data.tweets.map((tweet) => {
            console.log(tweet);
            return (
              <Tweet
                key={tweet.id}
                me={me}
                tweet={tweet}
                likeTweet={likeTweet}
                unlikeTweet={unlikeTweet}
                deleteTweet={deleteTweet}
              />
            );
          })}
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
      return (
        <div className="no-results">
          <h1 className="no-results-query">No results for "{query}"</h1>
          <p className="no-results-text">
            The term you entered did not bring up any results. You may have
            mistyped your term.
          </p>
        </div>
      );
    }
  } else if (type === "people") {
    if (userResults.data !== undefined && userResults.results > 0) {
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
      return (
        <div className="no-results">
          <h1 className="no-results-query">No results for "{query}"</h1>
          <p className="no-results-text">
            The term you entered did not bring up any results. You may have
            mistyped your term.
          </p>
        </div>
      );
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
