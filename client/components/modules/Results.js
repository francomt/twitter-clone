import React from "react";
import { Tweet, User } from "./index";
import { connect } from "react-redux";

import {
  fetchLikeTweetSearch,
  fetchUnlikeTweetSearch,
  fetchDeleteTweetSearch,
} from "../../store/results";

const Results = ({
  type,
  results,
  me,
  likeTweet,
  unlikeTweet,
  deleteTweet,
}) => {
  if (type === "latest") {
    return results.tweets.data.tweets.map((tweet) => (
      <Tweet
        key={tweet.id}
        me={me}
        tweet={tweet}
        likeTweet={likeTweet}
        unlikeTweet={unlikeTweet}
        deleteTweet={deleteTweet}
      />
    ));
  } else if (type === "people") {
    return results.users.data.users.map((user) => (
      <User key={user.id} user={user} />
    ));
  } else {
    return <p>Not Found</p>;
  }
};

const mapDispatch = (dispatch) => {
  return {
    likeTweet: (tweetId) => dispatch(fetchLikeTweetSearch(tweetId)),
    unlikeTweet: (tweetId) => dispatch(fetchUnlikeTweetSearch(tweetId)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweetSearch(tweetId)),
  };
};

export default connect(null, mapDispatch)(Results);
