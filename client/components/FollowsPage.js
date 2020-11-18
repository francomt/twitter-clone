import React, { useEffect, useState } from "react";
import {
  fetchProfileFollows,
  fetchQuickFollow,
  fetchQuickUnfollow,
} from "../store/profiles";
import { Selection } from "./modules";
import { connect } from "react-redux";
import history from "../history";
import Loader from "react-loader-spinner";

const FollowsPage = ({
  getProfile,
  profile,
  pathname,
  me,
  followUser,
  unfollowUser,
}) => {
  const [selected, setSelection] = useState(pathname);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);

  const followersClass =
    pathname === "followers"
      ? "follows-bottom__selection-active"
      : "follows-bottom__selection";

  const followingClass =
    pathname === "following"
      ? "follows-bottom__selection-active"
      : "follows-bottom__selection";

  return (
    <div className="follows-page-container">
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
        <h3 className="nav-text-feed util-margin-right-large">
          {profile.name}
        </h3>
      </nav>
      <div className="follows-bottom">
        <div
          onClick={() => {
            if (selected !== "followers") {
              setSelection("followers");
              history.push(`/${profile.username}/followers`);
            }
          }}
          className={followersClass}
        >
          <p className="follows-bottom__text">Followers</p>
        </div>
        <div
          onClick={() => {
            if (selected !== "following") {
              setSelection("following");
              history.push(`/${profile.username}/following`);
            }
          }}
          className={followingClass}
        >
          <p className="follows-bottom__text">Following</p>
        </div>
      </div>
      <div className="profile-bottom-half style-scrollbars">
        <div className="feed-middle">
          {loading || !profile ? (
            <Loader
              type="Oval"
              color="#1da1f2"
              height={40}
              width={40}
              style={{ margin: "25px" }}
            />
          ) : (
            <Selection
              selected={pathname}
              profile={profile}
              me={me}
              followUser={followUser}
              unfollowUser={unfollowUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    profile: state.profilesReducer.profile,
    pathname: ownProps.location.pathname.split("/")[2],
    me: state.profilesReducer.me,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username;
  const selected = ownProps.location.pathname.split("/")[2];
  return {
    getProfile: () => dispatch(fetchProfileFollows(username)),
    followUser: (userId) =>
      dispatch(fetchQuickFollow(userId, "page", selected)),
    unfollowUser: (meFollowing, profileFollower) =>
      dispatch(fetchQuickUnfollow(meFollowing, profileFollower)),
  };
};

export default connect(mapState, mapDispatch)(FollowsPage);
