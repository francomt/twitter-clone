import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tweet, CheckFollow } from "./modules/index";
import {
  fetchDeleteTweet,
  fetchLikeTweet,
  fetchProfileFeed,
  fetchUnlikeTweet,
} from "../store/tweets";
import { fetchProfile, fetchUnfollow, fetchFollow } from "../store/profiles";
import history from "../history";
import Loader from "react-loader-spinner";

const ProfilePage = ({
  getTweets,
  getProfile,
  profile,
  tweets,
  me,
  deleteTweet,
  likeTweet,
  unlikeTweet,
  location,
  unfollowUser,
  followUser,
}) => {
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(true);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    getProfile();
    setPage(1);
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }, [location]);

  useEffect(() => {
    console.log(initial);
    getTweets(page, initial);
    if (initial) {
      setInitial(false);
    }
  }, [page, location]);

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
        <div className="feed-middle">
          {loading ? (
            <Loader
              type="Oval"
              color="#1da1f2"
              height={40}
              width={40}
              style={{ margin: "25px" }}
            />
          ) : (
            <>
              <div className="profile-info-container">
                <img className="profile__coverImg" src={profile.coverImg} />

                <div className="profile__follow-edit">
                  {me.id === profile.id ? (
                    <button
                      onClick={() => {
                        history.push("/profile");
                      }}
                      className="btn btn--outline profile__edit"
                    >
                      Edit profile
                    </button>
                  ) : (
                    <CheckFollow
                      me={me}
                      user={profile}
                      followUser={followUser}
                      unfollowUser={unfollowUser}
                    />
                  )}
                </div>

                <img className="profile__photo" src={profile.photo} />

                <h1 className="profile__name">{profile.name}</h1>
                <p className="profile__username">@{profile.username}</p>

                <p className="profile__bio">{profile.bio}</p>

                <div className="profile__follow-follower">
                  <p
                    className="follow-count-text util-margin-right-medium"
                    onClick={() => {
                      history.push(`/${profile.username}/following`);
                    }}
                  >
                    <span className="bold">{profile.following.length}</span>{" "}
                    Following
                  </p>
                  <p
                    className="follow-count-text"
                    onClick={() => {
                      history.push(`/${profile.username}/followers`);
                    }}
                  >
                    <span className="bold">{profile.followers.length}</span>{" "}
                    Followers
                  </p>
                </div>
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
                        likeTweet={likeTweet}
                        unlikeTweet={unlikeTweet}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    profile: state.profilesReducer.profile,
    tweets: state.tweetReducer.feed,
    me: state.profilesReducer.me,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username;
  return {
    getProfile: () => dispatch(fetchProfile(username)),
    getTweets: (page, initialLoad) =>
      dispatch(fetchProfileFeed(username, page, initialLoad)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweet(tweetId)),
    likeTweet: (tweetId) => dispatch(fetchLikeTweet(tweetId)),
    unlikeTweet: (tweetId) => dispatch(fetchUnlikeTweet(tweetId)),
    followUser: (userId) => dispatch(fetchFollow(userId)),
    unfollowUser: (meFollowing, profileFollower) =>
      dispatch(fetchUnfollow(meFollowing, profileFollower)),
  };
};

export default connect(mapState, mapDispatch)(ProfilePage);
