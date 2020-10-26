import React from "react";
import history from "../../history";
import { CheckFollow, CheckFollower } from "./index";

const User = ({ me, user, followUser, unfollowUser, selected }) => {
  return (
    <div key={user.id} className="tweet">
      <div className="tweet__container">
        <img
          src={user.photo}
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
              <div className="profile__username-container">
                <p
                  onClick={() => {
                    history.push(`/${user.username}`);
                  }}
                  className="content__username"
                >
                  @{user.username}
                </p>
                {me.id !== user.id && (
                  <CheckFollower
                    me={me}
                    user={user}
                    type="quick"
                    option={selected}
                  />
                )}
              </div>
            </div>
            {me.id !== user.id && (
              <CheckFollow
                me={me}
                user={user}
                followUser={followUser}
                unfollowUser={unfollowUser}
                type="quick"
              />
            )}
          </div>
          <p className="content__text">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
