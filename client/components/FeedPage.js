import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchDeleteTweet,
  fetchLikeTweet,
  fetchUnlikeTweet,
  fetchFeed,
} from "../store/tweets";
import { CreateTweet, Tweet, ExploreResults } from "./modules/index";
import { debounce } from "lodash";
import axios from "axios";
import history from "../history";

class FeedPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      query: "",
      results: [],
      loading: false,
      message: "",
      page: 1,
      setPage: true,
      length: 0,
    };
    this.cancel = "";
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.getFeed(this.props.me.id, this.state.page, true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._isMounted) {
      if (prevState.page !== this.state.page) {
        if (this.state.length === this.props.feed.length) {
          this.setState({ setPage: false });
          return;
        }

        this.props.getFeed(this.props.me.id, this.state.page);
        this.setState({ length: this.props.feed.length });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (this.state.setPage && scrollHeight - scrollTop === clientHeight) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  async fetchResults(updatedPageNum = "1", query) {
    const url = `/api/users/search?username=${query}&page=1&limit=4`;

    if (this.cancel) {
      //cancel previous request before making a new request
      this.cancel.cancel();
    }

    //Create cancel token
    this.cancel = axios.CancelToken.source();

    axios
      .get(url, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const noResults = !res.results ? "No results" : "";

        this.setState({
          results: res.data.data.users,
          message: noResults,
          loading: false,
        });
      })
      .catch((err) => {
        if (axios.isCancel(err) || err) {
          this.setState({
            loading: false,
            message: "Failed search. Please check network",
          });
        }
      });
  }

  handleInputChange = debounce((text) => {
    if (this._isMounted) {
      const query = text;

      if (!query) {
        this.setState({ query, results: [], message: "" });
      } else {
        this.setState({ query, loading: true, message: "" }, () => {
          this.fetchResults(1, query);
        });
      }
    }
  }, 500);

  render() {
    const {
      location,
      feed,
      me,
      deleteTweet,
      likeTweet,
      unlikeTweet,
      explore,
    } = this.props;

    const searchResults = this.state.results;

    return (
      <div className="feed-page-container">
        <nav className="secondary-nav">
          <h3 className="nav-text-feed util-margin-right-large">Home</h3>
          <div className="input-container util-margin-auto-left util-margin-right-large">
            <form
              className="searchbar-container"
              onSubmit={(e) => {
                e.preventDefault();
                history.push(`/search?q=${this.state.input}`);
              }}
            >
              <input
                onChange={(e) => {
                  this.handleInputChange(e.target.value);
                  this.setState({ input: e.target.value });
                }}
                className="searchbar"
                placeholder="Search Twitter"
              ></input>
              <svg viewBox="0 0 24 24" className="searchbar__icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </form>

            {this.state.query.length > 0 && (
              <>
                <div className="search-results">
                  <div
                    onClick={() => {
                      history.push(`/search?q=${this.state.input}`);
                    }}
                    className="search-results__item-query"
                  >
                    Search for "{this.state.query}"
                  </div>
                  {searchResults.length > 0 &&
                    searchResults.map((user) => {
                      return (
                        <div
                          onClick={() => {
                            history.push(`/${user.username}`);
                          }}
                          key={user.id}
                          className="search-results__item"
                        >
                          <img
                            src={user.photo}
                            className="tweet__profile-img tweet__profile-img--search"
                          />
                          <div className="search-results__user">
                            <p className="search-results__user-name">
                              {user.name}
                            </p>
                            <p className="search-results__user-username">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </nav>
        <div
          onScroll={this.handleScroll}
          className="feed-page-half style-scrollbars"
        >
          <div className="feed-middle">
            <div className="create-tweet-container">
              <CreateTweet
                location={location}
                photo={me.photo}
                user={me.id}
                rows={1}
              />
            </div>
            <div className="feed-container">
              {feed &&
                feed.map((tweet) => {
                  return (
                    <Tweet
                      key={tweet.id}
                      tweet={tweet}
                      me={me}
                      deleteTweet={deleteTweet}
                      likeTweet={likeTweet}
                      unlikeTweet={unlikeTweet}
                    />
                  );
                })}
            </div>
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
  }
}

const mapState = (state, ownProps) => {
  return {
    me: state.profilesReducer.me,
    feed: state.tweetReducer.feed,
    location: ownProps.location.pathname,
    explore: state.exploreReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFeed: (userId, page, initialLoad) =>
      dispatch(fetchFeed(userId, page, initialLoad)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweet(tweetId)),
    likeTweet: (tweetId) => dispatch(fetchLikeTweet(tweetId)),
    unlikeTweet: (tweetId) => dispatch(fetchUnlikeTweet(tweetId)),
  };
};

export default connect(mapState, mapDispatch)(FeedPage);
