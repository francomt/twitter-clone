import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchLikeTweetSearch,
  fetchSearchTweets,
  fetchUnlikeTweetSearch,
  fetchDeleteTweetSearch,
  fetchTweetSwitch,
  fetchSearchUsers,
  fetchUsersSwitch,
} from "../store/results";
import { fetchUpdatePrev } from "../store/tweets";
import Tweet from "./modules/Tweet";
import history from "../history";

const DisplayFeed = ({
  type,
  results,
  me,
  likeTweet,
  unlikeTweet,
  deleteTweet,
}) => {
  if (type === "latest" && results.tweets && results.tweets.length > 0) {
    return (
      <>
        {results.tweets.map((tweet) => {
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
      </>
    );
  } else if (type === "people" && results.users && results.users.length > 0) {
    return (
      <>
        {results.users.map((user) => {
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
                    <p
                      onClick={() => {
                        history.push(`/${user.username}`);
                      }}
                      className="content__name"
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
                  <p className="content__text">{user.bio}</p>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return <div>NO RESULTS</div>;
  }
};

const SearchPage = ({
  location,
  results,
  searchTweets,
  me,
  likeTweet,
  unlikeTweet,
  deleteTweet,
  updatePrev,
  tweetSwitch,
  searchUsers,
  usersSwitch,
}) => {
  //query
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState("");

  //pagination
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(true);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const q = params.get("q");

    if (!q) return history.push("/explore");

    //query type
    const type = params.get("t");

    const t = type ? type : "latest";

    setQuery(q);
    setType(t);

    if (t === "latest") {
      searchTweets(q, page);
    } else if (t === "people") {
      searchUsers(q, page);
    }
    updatePrev(history.location.pathname);
  }, []);

  useEffect(() => {
    if (type === "latest") {
      if (page !== 1) {
        searchTweets(query, page);
      }
    } else if (type === "people") {
      if (page !== 1) {
        searchUsers(query, page);
      }
    }
  }, [page]);

  useEffect(() => {
    if (type === "people") {
      history.push(`/search?q=${query}&t=people`);
      usersSwitch(query);
    } else if (type === "latest") {
      history.push(`/search?q=${query}`);
      tweetSwitch(query);
    }
  }, [type]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (fetch && scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
      if (type === "latest") {
        setLength((prev) => {
          if (prev === results.tweets.length) setFetch(false);
          return results.tweets.length;
        });
      } else if (type === "people") {
        setLength((prev) => {
          if (prev === results.users.length) setFetch(false);
          return results.users.length;
        });
      }
    }
  };

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
              onClick={() => {
                setPage(1);
                setLength(0);
                setFetch(true);
                setType("latest");
              }}
              className={
                type === "latest"
                  ? "search-bottom__selection-active"
                  : "search-bottom__selection"
              }
            >
              <p className="search-bottom__text">Latest</p>
            </div>
            <div
              onClick={() => {
                setPage(1);
                setFetch(true);
                setLength(0);
                setType("people");
              }}
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
        <div
          onScroll={handleScroll}
          className="results-list-container style-scrollbars"
        >
          <DisplayFeed
            type={type}
            me={me}
            results={results}
            likeTweet={likeTweet}
            unlikeTweet={unlikeTweet}
            deleteTweet={deleteTweet}
          />
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
    searchTweets: (query, page) => dispatch(fetchSearchTweets(query, page)),
    likeTweet: (tweetId) => dispatch(fetchLikeTweetSearch(tweetId)),
    unlikeTweet: (tweetId) => dispatch(fetchUnlikeTweetSearch(tweetId)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweetSearch(tweetId)),
    tweetSwitch: (query) => dispatch(fetchTweetSwitch(query)),
    searchUsers: (query, page) => dispatch(fetchSearchUsers(query, page)),
    usersSwitch: (query) => dispatch(fetchUsersSwitch(query)),
    updatePrev: (path) => {
      dispatch(fetchUpdatePrev(path));
    },
  };
};

export default connect(mapState, mapDispatch)(SearchPage);
