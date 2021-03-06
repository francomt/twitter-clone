import React, { useRef, useState } from "react";
import history from "../../history";
import tweetImagePreview from "./tweetImagePreviews";
import TimeAgo from "react-timeago";

const Tweet = ({ tweet, me, deleteTweet, likeTweet, unlikeTweet }) => {
  const liked = tweet.userLikes.some((user) => {
    return user.id === me.id;
  });

  const fillPage = useRef(null);
  const popupEl = useRef(null);

  const fillPageConfirm = useRef(null);
  const confirmDelete = useRef(null);

  const handlePopup = () => {
    fillPage.current.style.display = "block";
    popupEl.current.style.display = "flex";
  };

  const handleClose = () => {
    fillPage.current.style.display = "none";
    popupEl.current.style.display = "none";
  };

  const handleConfirm = () => {
    fillPageConfirm.current.style.display = "flex";
    fillPage.current.style.display = "none";
    popupEl.current.style.display = "none";
    confirmDelete.current.style.display = "flex";
  };

  const handleCloseConfirm = () => {
    fillPageConfirm.current.style.display = "none";
    fillPage.current.style.display = "block";
    popupEl.current.style.display = "flex";
    confirmDelete.current.style.display = "none";
  };

  return (
    <div className="tweet">
      <div className="tweet__share"></div>
      <div className="tweet__container">
        <img
          src={tweet.user.photo}
          onClick={() => {
            history.push(`/${tweet.user.username}`);
          }}
          className="tweet__profile-img"
        />
        <div className="content">
          <div className="content__user">
            <p
              onClick={() => {
                history.push(`/${tweet.user.username}`);
              }}
              className="content__name"
            >
              {tweet.user.name}
            </p>
            <p
              onClick={() => {
                history.push(`/${tweet.user.username}`);
              }}
              className="content__username"
            >
              @{tweet.user.username}
            </p>

            <p className="separator">·</p>

            <TimeAgo
              className="content__username"
              date={tweet.createdAt}
              live={false}
              formatter={(val, unit) => {
                if (val === 0 && unit === "second") return "now";

                if (unit === "second") unit = "s";
                else if (unit === "minute") unit = "m";
                else if (unit === "hour") unit = "h";
                else if (unit === "day") unit = "d";
                else if (unit === "week") unit = "w";

                return val + unit;
              }}
            />

            {/* Popup */}
            {me.id === tweet.user.id && (
              <div className="tweet-popup-container">
                <svg
                  onClick={handlePopup}
                  viewBox="0 0 24 24"
                  className="content__popup"
                >
                  <g>
                    <path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path>
                  </g>
                </svg>
                <div
                  onClick={handleClose}
                  ref={fillPage}
                  className="popup-fill-page"
                ></div>
                <div ref={popupEl} className="popup-content">
                  <div onClick={handleConfirm} className="popup-content__list">
                    <svg
                      viewBox="0 0 24 24"
                      className="popup-content__delete-icon"
                    >
                      <g>
                        <path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path>
                        <path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path>
                      </g>
                    </svg>
                    <p className="popup-content__delete-text">Delete</p>
                  </div>
                </div>
              </div>
            )}
            <div
              className="confirm-delete-container"
              ref={fillPageConfirm}
              onClick={handleCloseConfirm}
            ></div>
            <div ref={confirmDelete} className="confirm-delete">
              <h1 className="confirm-delete__header">Delete Tweet?</h1>
              <p className="confirm-delete__body">
                This can't be undone and it will be
                <br />
                removed from your profile, the timeline
                <br />
                of any accounts that follow you, and
                <br />
                from Tweeter search results.
              </p>
              <div className="confirm-delete__buttons-container">
                <button
                  onClick={handleCloseConfirm}
                  className="btn btn--neutral util-margin-right-small"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteTweet(tweet.id);
                  }}
                  className="btn btn--red"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <p className="content__text">{tweet.text}</p>
          {tweet.images.length ? (
            <div className="pictures-container">
              {tweetImagePreview(tweet.images)}
            </div>
          ) : (
            ""
          )}
          <div className="content__shares">
            {liked ? (
              <div
                className="content__like-container"
                onClick={() => {
                  unlikeTweet(tweet.id);
                }}
              >
                <div className="content__icon-box">
                  <svg viewBox="0 0 24 24" className="content__like">
                    <g>
                      <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path>
                    </g>
                  </svg>
                </div>
                <p className="content__like-num">{tweet.likes}</p>
              </div>
            ) : (
              <div
                className="content__like-container"
                onClick={() => {
                  likeTweet(tweet.id);
                }}
              >
                <div className="content__icon-box">
                  <svg viewBox="0 0 24 24" className="content__not-liked">
                    <g>
                      <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                    </g>
                  </svg>
                </div>
                <p className="content__not-like-num">{tweet.likes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
