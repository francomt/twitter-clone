import React from "react";

const CheckFollow = ({ me, user, followUser, unfollowUser, type }) => {
  const userFollowers = {};

  let following = false;

  let meFollowingId;
  let userFollowing;

  if (user && user.followers) {
    if (type === "quick") {
      for (let i = 0; i < user.followers.length; i++) {
        const currentId = user.followers[i];

        userFollowers[currentId] = true;
      }
    } else {
      for (let i = 0; i < user.followers.length; i++) {
        const currentFollow = user.followers[i];

        userFollowers[currentFollow._id] = true;
      }
    }
  }

  if (me && me.following) {
    for (let j = 0; j < me.following.length; j++) {
      const current = me.following[j];
      if (userFollowers[current.followingId]) {
        meFollowingId = current._id;
        userFollowing = current.followingId;
        following = true;
      }
    }
  }

  if (following) {
    return (
      <button
        onClick={() => {
          unfollowUser(meFollowingId, userFollowing);
        }}
        className="btn btn--quick-follow"
      >
        Following
      </button>
    );
  } else {
    return (
      <button
        onClick={() => followUser(user.id)}
        className="btn btn--outline btn--quick-follow"
      >
        Follow
      </button>
    );
  }
};

export default CheckFollow;
