import React from "react";
import history from "../../history";

const checkFollow = (me, user) => {
  const userFollowers = {};

  for (let i = 0; i < user.followers.length; i++) {
    const currentId = user.followers[i];

    userFollowers[currentId] = true;
  }

  for (let j = 0; j < me.following.length; j++) {
    const current = me.following[j];
    if (userFollowers[current.followingId]) return true;
  }

  return false;
};

const User = ({ me, user, followUser }) => {
  const following = checkFollow(me, user);

  return (
    <div key={user.id} className="tweet">
      <div className="tweet__container">
        <img
          src={`/img/users/${user.photo}`}
          onClick={() => {
            history.push(`/${user.username}`);
          }}
          className="tweet__profile-img"
        />
        <div className="content">
          <div className="content__user">
            <div className="content__user-search">
              <p
                onClick={() => {
                  history.push(`/${user.username}`);
                }}
                className="content__name util-margin-btm-xxsmall"
              >
                {user.name}
              </p>
              <p
                onClick={() => {
                  history.push(`/${user.username}`);
                }}
                className="content__username"
              >
                @{user.username}
              </p>
            </div>
            {following ? (
              <button className="btn btn--quick-follow">Following</button>
            ) : (
              <button
                onClick={() => followUser(user.id)}
                className="btn btn--outline btn--quick-follow"
              >
                Follow
              </button>
            )}
          </div>
          <p className="content__text">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
