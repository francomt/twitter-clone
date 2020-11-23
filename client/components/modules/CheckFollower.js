import React from "react";

const CheckFollower = ({ me, user, type }) => {
  let follower = false;

  if (type === "quick") {
    const followers = {};

    if (me.followers.length > 0) {
      me.followers.forEach((follow) => {
        followers[follow.user.id] = true;
      });

      if (followers[user.id]) follower = true;
    }
  } else {
    if (user.following.length > 0) {
      for (let i = 0; i < user.following.length; i++) {
        const current = user.following[i];

        if (current.user && current.user.id === me.id) {
          follower = true;
          break;
        }
      }
    }
  }

  if (follower) {
    return <p className="profile__follows-you">Follows you</p>;
  } else {
    return "";
  }
};

export default CheckFollower;
