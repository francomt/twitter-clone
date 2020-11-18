import React from "react";
import { User } from "./index";

const Selection = ({ selected, profile, me, followUser, unfollowUser }) => {
  if (selected === "followers") {
    if (profile.followers.length > 0) {
      return profile.followers.map((user) => {
        return (
          <User
            key={user.id}
            me={me}
            user={user}
            followUser={followUser}
            unfollowUser={unfollowUser}
            selected="followers"
          />
        );
      });
    } else {
      return (
        <div className="no-results">
          <h1 className="no-results-query">
            @{profile.username} doesn't have any followers
          </h1>
          <p className="no-results-text-small">
            When someone follows them, they'll be listed here.
          </p>
        </div>
      );
    }
  } else if (selected === "following") {
    if (profile.following.length > 0) {
      return profile.following.map((user) => {
        return (
          <User
            key={user.id}
            me={me}
            user={user}
            followUser={followUser}
            unfollowUser={unfollowUser}
            selected="following"
          />
        );
      });
    } else {
      return (
        <div className="no-results">
          <h1 className="no-results-query">
            @{profile.username} isn't following anyone
          </h1>
          <p className="no-results-text-small">
            When they do, they'll be listed here.
          </p>
        </div>
      );
    }
  } else {
    return <div>Not found</div>;
  }
};

export default Selection;
