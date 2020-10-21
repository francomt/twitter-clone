import React from "react";
import { Tweet, User } from "./index";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import {
  fetchLikeTweetSearch,
  fetchUnlikeTweetSearch,
  fetchDeleteTweetSearch,
} from "../../store/results";

import { fetchFollow } from "../../store/profiles";

const Results = ({
  type,
  results,
  me,
  likeTweet,
  unlikeTweet,
  deleteTweet,
  loading,
  followUser,
}) => {
  if (type === "latest") {
    return (
      <>
        {results.tweets.data.tweets.map((tweet) => (
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
  } else if (type === "people") {
    return (
      <>
        {results.users.data.users.map((user) => (
          <User key={user.id} user={user} followUser={followUser} me={me} />
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
    return <p>Not Found</p>;
  }
};

const mapDispatch = (dispatch) => {
  return {
    likeTweet: (tweetId) => dispatch(fetchLikeTweetSearch(tweetId)),
    unlikeTweet: (tweetId) => dispatch(fetchUnlikeTweetSearch(tweetId)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweetSearch(tweetId)),
    followUser: (userId) => dispatch(fetchFollow(userId)),
  };
};

export default connect(null, mapDispatch)(Results);
