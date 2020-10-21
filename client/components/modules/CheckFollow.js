import React from "react";

const CheckFollow = ({ me, user, followUser, unfollowUser }) => {
  const userFollowers = {};

  let following = false;

  let meFollowingId;

  if (user && user.followers) {
    for (let i = 0; i < user.followers.length; i++) {
      const currentId = user.followers[i];

      userFollowers[currentId] = true;
    }
  }

  if (me && me.following) {
    for (let j = 0; j < me.following.length; j++) {
      const current = me.following[j];
      if (userFollowers[current.followingId]) {
        meFollowingId = current._id;
        following = true;
      }
    }
  }

  if (following) {
    return (
      <button
        onClick={() => {
          unfollowUser(meFollowingId);
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
