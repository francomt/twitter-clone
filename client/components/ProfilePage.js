import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tweet } from "./modules/index";
import { fetchDeleteTweet, fetchProfileFeed } from "../store/tweets";
import { fetchProfile } from "../store/profile";
import history from "../history";

const ProfilePage = ({
  getTweets,
  getProfile,
  profile,
  tweets,
  me,
  deleteTweet,
}) => {
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(true);
  const [length, setLength] = useState(0);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getTweets(page);
  }, [page]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (fetch && scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
      setLength((prev) => {
        if (prev === tweets.length) setFetch(false);
        return tweets.length;
      });
    }
  };

  return (
    <div className="profile-page-container">
      <nav className="secondary-nav">
        <h3 className="nav-text util-margin-right-large">{profile.name}</h3>
      </nav>
      <div
        onScroll={handleScroll}
        className="profile-bottom-half style-scrollbars"
      >
        <div className="profile-info-container">
          <button
            onClick={() => {
              history.push("/profile");
            }}
            className="btn btn--outline"
          >
            Edit profile
          </button>
        </div>
        <div className="profile-feed-container">
          {tweets &&
            tweets.map((tweet) => {
              return (
                <Tweet
                  key={tweet.id}
                  tweet={tweet}
                  me={me}
                  deleteTweet={deleteTweet}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    profile: state.profileReducer,
    tweets: state.tweetReducer.feed,
    me: state.authReducer,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username;
  return {
    getProfile: () => dispatch(fetchProfile(username)),
    getTweets: (page) => dispatch(fetchProfileFeed(username, page)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweet(tweetId)),
  };
};

export default connect(mapState, mapDispatch)(ProfilePage);
