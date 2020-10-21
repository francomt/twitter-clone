import React from "react";
import history from "../../history";
import { CheckFollow } from "./index";

const User = ({ me, user, followUser, unfollowUser }) => {
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
            <CheckFollow
              me={me}
              user={user}
              followUser={followUser}
              unfollowUser={unfollowUser}
            />
          </div>
          <p className="content__text">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
