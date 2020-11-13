import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSearchTweets, fetchUpdatePrev } from "../store/tweets";
import { fetchSearchUsers } from "../store/profiles";
import { Results, ExploreResults } from "./modules";
import history from "../history";
import Loader from "react-loader-spinner";

const SearchPage = ({
  me,
  users,
  tweets,
  URLquery,
  URLtype,
  searchQuery,
  explore,
}) => {
  const [loadingData, setLoading] = useState(true);
  //query
  const [query, setQuery] = useState(URLquery);
  const [type, setType] = useState(URLtype);

  //pagination
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(true);
  const [pageLoad, setPageLoad] = useState(false);

  //MOUNTING
  useEffect(() => {
    //If no query, redirect to explore page
    if (!query) return history.push("/explore");

    searchQuery(type, query, page, true);
    // updatePrev();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [query, type]);

  //ON PAGE UPDATE
  useEffect(() => {
    if (!loadingData) {
      searchQuery(type, query, page);
    }
  }, [page]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (!loadingData) {
      if (fetch && scrollHeight - scrollTop === clientHeight) {
        const stopTweets = tweets.results === tweets.totalResults;
        const stopUsers = users.results === users.totalResults;

        if (type === "latest") {
          if (stopTweets) setFetch(false);
          else {
            setPageLoad(true);
            setTimeout(() => {
              setPageLoad(false);
            }, 150);
            setPage((prev) => prev + 1);
          }
        } else if (type === "people") {
          if (stopUsers) setFetch(false);
          else {
            setPageLoad(true);
            setPage((prev) => prev + 1);
            setTimeout(() => {
              setPageLoad(false);
            }, 150);
          }
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchVal = e.target.search.value;

    if (searchVal !== query) {
      setLoading(true);
      setPage(1);
      setFetch(true);
      setQuery(searchVal);

      if (type === "latest") {
        history.push(`/search?q=${searchVal}`);
      } else if (type === "people") {
        history.push(`/search?q=${searchVal}&t=people`);
      }
    }
  };

  const latestClass =
    type === "latest"
      ? "search-bottom__selection-active"
      : "search-bottom__selection";

  const peopleClass =
    type === "people"
      ? "search-bottom__selection-active"
      : "search-bottom__selection";

  return (
    <div className="search-page-container">
      <nav className="search-nav">
        <div className="search-top">
          <div
            onClick={() => {
              history.goBack();
              setTimeout(() => {
                history.go();
              }, 50);
            }}
            className="secondary-nav__back"
          >
            <svg className="secondary-nav__back__arrow" viewBox="0 0 24 24">
              <g>
                <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
              </g>
            </svg>
          </div>
          <form className="searchbar-container-page" onSubmit={handleSubmit}>
            <input
              name="search"
              className="searchbar"
              placeholder="Search Tweeted"
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
              if (type !== "latest") {
                history.push(`/search?q=${query}`);
                setLoading(true);
                setPage(1);
                setFetch(true);
                setType("latest");
              }
            }}
            className={latestClass}
          >
            <p className="search-bottom__text">Latest</p>
          </div>
          <div
            onClick={() => {
              if (type !== "people") {
                history.push(`/search?q=${query}&t=people`);
                setLoading(true);
                setPage(1);
                setFetch(true);
                setType("people");
              }
            }}
            className={peopleClass}
          >
            <p className="search-bottom__text">People</p>
          </div>
        </div>
      </nav>
      <div
        onScroll={handleScroll}
        className="results-list-container style-scrollbars"
      >
        <div className="search-feed-middle">
          {loadingData ? (
            <Loader
              type="Oval"
              color="#1da1f2"
              height={40}
              width={40}
              style={{ margin: "25px" }}
            />
          ) : (
            <Results
              type={type}
              query={query}
              tweetResults={tweets}
              userResults={users}
              me={me}
              loading={pageLoad}
            />
          )}
        </div>
        <div className="feed-right">
          <div className="explore-quick-container">
            <h1 className="explore-quick-header">What's happening</h1>

            <ExploreResults results={explore} type="quick" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  const params = new URLSearchParams(ownProps.location.search);
  return {
    me: state.profilesReducer.me,
    users: state.profilesReducer.search,
    tweets: state.tweetReducer.search,
    explore: state.exploreReducer,
    URLquery: params.get("q"),
    URLtype: params.get("t") ? params.get("t") : "latest",
  };
};

const mapDispatch = (dispatch) => {
  return {
    searchQuery: (type, query, page, initialLoad) => {
      if (type === "latest")
        dispatch(fetchSearchTweets(query, page, initialLoad));
      else if (type === "people")
        dispatch(fetchSearchUsers(query, page, initialLoad));
    },
    updatePrev: () => {
      dispatch(fetchUpdatePrev(history.location.pathname));
    },
  };
};

export default connect(mapState, mapDispatch)(SearchPage);
