import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchLikeTweetSearch,
  fetchSearchTweets,
  fetchUnlikeTweetSearch,
  fetchDeleteTweetSearch,
} from "../store/results";
import { fetchUpdatePrev } from "../store/tweets";
import Tweet from "./modules/Tweet";
import history from "../history";

const SearchPage = ({
  location,
  results,
  searchTweets,
  me,
  likeTweet,
  unlikeTweet,
  deleteTweet,
  updatePrev,
}) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const q = params.get("q");

    if (!q) return history.push("/explore");

    //query type
    const t = params.get("t");

    setQuery(q);
    setType(t ? t : "latest");

    searchTweets(q);
    updatePrev(history.location.pathname);
  }, []);

  return (
    <div className="search-page-container">
      <div className="feed-middle">
        <nav className="search-nav">
          <div className="search-top">
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
            <form className="searchbar-container-page">
              <input
                className="searchbar"
                placeholder="Search Twitter"
                defaultValue={query}
              ></input>
              <svg viewBox="0 0 24 24" className="searchbar__icon-page">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </form>
          </div>
          <div className="search-bottom">
            <div
              className={
                type === "latest"
                  ? "search-bottom__selection-active"
                  : "search-bottom__selection"
              }
            >
              <p className="search-bottom__text">Latest</p>
            </div>
            <div
              className={
                type === "people"
                  ? "search-bottom__selection-active"
                  : "search-bottom__selection"
              }
            >
              <p className="search-bottom__text">People</p>
            </div>
          </div>
        </nav>
        <div className="results-list-container style-scrollbars">
          {results.tweets.length > 0 &&
            results.tweets.map((tweet) => {
              return (
                <Tweet
                  key={tweet.id}
                  me={me}
                  tweet={tweet}
                  likeTweet={likeTweet}
                  unlikeTweet={unlikeTweet}
                  deleteTweet={deleteTweet}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    me: state.authReducer,
    results: state.searchReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    searchTweets: (query) => dispatch(fetchSearchTweets(query)),
    likeTweet: (tweetId) => dispatch(fetchLikeTweetSearch(tweetId)),
    unlikeTweet: (tweetId) => dispatch(fetchUnlikeTweetSearch(tweetId)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweetSearch(tweetId)),
    updatePrev: (path) => {
      dispatch(fetchUpdatePrev(path));
    },
  };
};

export default connect(mapState, mapDispatch)(SearchPage);
