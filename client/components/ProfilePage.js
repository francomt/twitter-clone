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
        <div
          onClick={() => {
            history.goBack();
          }}
          className="secondary-nav__back"
        >
          <svg className="secondary-nav__back__arrow" viewBox="0 0 24 24">
            <g>
              <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
            </g>
          </svg>
        </div>
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
