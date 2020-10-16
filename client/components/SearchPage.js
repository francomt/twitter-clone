import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSearchTweets } from "../store/results";
import history from "../history";

const SearchPage = ({ location, results, searchTweets }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const q = params.get("q");

    if (!q) return history.push("/explore");

    const t = params.get("type");

    setQuery(q);
    setType(t ? t : "tweet");

    searchTweets(q);
  }, []);

  return <div className="search-page-container"></div>;
};

const mapState = (state) => {
  return {
    results: state.searchReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    searchTweets: (query) => dispatch(fetchSearchTweets(query)),
  };
};

export default connect(mapState, mapDispatch)(SearchPage);
