import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ExploreResults } from "./modules";
import history from "../history";

const ExplorePage = ({ results }) => {
  return (
    <div className="explore-page-container">
      <nav className="secondary-nav">
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
        <h3 className="nav-text-feed util-margin-right-large">Explore</h3>
      </nav>

      <div className="profile-bottom-half style-scrollbars">
        <div className="feed-middle">
          <div className="search-top-page">
            <form
              className="searchbar-container-page-main"
              onSubmit={(e) => {
                e.preventDefault();
                history.push(`/search?q=${e.target.search.value}`);
              }}
            >
              <input
                name="search"
                className="searchbar"
                placeholder="Search Twitter"
              ></input>
              <svg viewBox="0 0 24 24" className="searchbar__icon-page">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </form>
          </div>
          <ExploreResults results={results} />
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    results: state.exploreReducer,
  };
};

export default connect(mapState, null)(ExplorePage);
