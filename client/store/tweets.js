import axios from "axios";
import history from "../history";

//ACTION TYPES
const GET_FEED = "GET_FEED";
const GET_PROFILE_FEED = "GET_PROFILE_FEED";
const CREATE_TWEET = "CREATE_TWEET";
const DELETE_TWEET = "DELETE_TWEET";
const LIKE_TWEET = "LIKE_TWEET";
const UPDATE_PREV = "UPDATE_PREV";

const getFeed = (feed, initialLoad) => ({
  type: GET_FEED,
  feed,
  initialLoad,
});
const getProfileFeed = (feed, initialLoad, prev) => ({
  type: GET_PROFILE_FEED,
  feed,
  initialLoad,
  prev,
});
const createTweet = (tweet, pathname) => ({
  type: CREATE_TWEET,
  tweet,
  pathname,
});
const deleteTweet = (tweetId) => ({ type: DELETE_TWEET, tweetId });
const likeTweet = (tweet) => ({ type: LIKE_TWEET, tweet });
const updatePrev = (prev) => ({ type: UPDATE_PREV, prev });

export const fetchFeed = (userId, page = 1, initialLoad = false) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/${userId}/feed?page=${page}&limit=9`
      );

      dispatch(getFeed(data, initialLoad));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchProfileFeed = (username, page = 1, initialLoad = false) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/${username}/tweets?page=${page}&limit=8`
      );
      dispatch(getProfileFeed(data, initialLoad, history.location.pathname));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCreateTweet = (body, pathname) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/tweets/", body);
      dispatch(createTweet(data, pathname));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchDeleteTweet = (tweetId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/tweets/${tweetId}`);
      dispatch(deleteTweet(tweetId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchLikeTweet = (tweetId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tweets/like/${tweetId}`);
      dispatch(likeTweet(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUnlikeTweet = (tweetId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tweets/unlike/${tweetId}`);
      dispatch(likeTweet(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUpdatePrev = (path) => {
  return (dispatch) => {
    dispatch(updatePrev(path));
  };
};

///////////////////////////////
////////Tweet Search//////////
/////////////////////////////

//Action types tweet search
const SEARCH_TWEETS = "SEARCH_TWEETS";
const LIKE_TWEET_SEARCH = "LIKE_TWEET_SEARCH";
const DELETE_TWEET_SEARCH = "DELETE_TWEET_SEARCH";

const searchTweets = (tweets, initialLoad) => ({
  type: SEARCH_TWEETS,
  tweets,
  initialLoad,
});
const likeTweetSearch = (tweet) => ({ type: LIKE_TWEET_SEARCH, tweet });
const deleteTweetSearch = (tweetId) => ({ type: DELETE_TWEET_SEARCH, tweetId });

export const fetchSearchTweets = (query, page = 1, initialLoad = false) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/tweets/search?text=${query}&page=${page}&limit=8`
      );
      dispatch(searchTweets(data, initialLoad));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchLikeTweetSearch = (tweetId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tweets/like/${tweetId}`);
      dispatch(likeTweetSearch(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUnlikeTweetSearch = (tweetId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tweets/unlike/${tweetId}`);
      dispatch(likeTweetSearch(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchDeleteTweetSearch = (tweetId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/tweets/${tweetId}`);
      dispatch(deleteTweetSearch(tweetId));
    } catch (error) {
      console.error(error);
    }
  };
};

const defaultState = {
  prev: "",
  feed: [],
  search: {},
};

function tweetReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_FEED:
      if (action.feed.data) {
        if (action.initialLoad) {
          return {
            ...state,
            prev: action.prev,
            feed: [...action.feed.data.tweets],
          };
        } else {
          return {
            ...state,
            prev: action.prev,
            feed: [...state.feed, ...action.feed.data.tweets],
          };
        }
      } else {
        return state;
      }

    case GET_PROFILE_FEED:
      if (action.feed.data) {
        if (action.initialLoad || action.prev !== state.prev) {
          return {
            ...state,
            prev: action.prev,
            feed: action.feed.data.tweets,
          };
        } else {
          return {
            ...state,
            prev: action.prev,
            feed: [...state.feed, ...action.feed.data.tweets],
          };
        }
      } else {
        return state;
      }

    case CREATE_TWEET:
      if (action.tweet.data) {
        if (action.pathname === "/home" || action.pathname === "/profile") {
          return {
            ...state,
            prev: state.prev,
            feed: [action.tweet.data.tweet, ...state.feed],
          };
        } else {
          return state;
        }
      } else {
        return state;
      }

    case DELETE_TWEET:
      const filtered = [...state.feed].filter((tweet) => {
        return tweet.id !== action.tweetId;
      });
      return { ...state, prev: state.prev, feed: filtered };

    case LIKE_TWEET:
      if (action.tweet.data) {
        const updated = state.feed.map((tweet) => {
          if (tweet.id === action.tweet.data.tweet.id)
            return action.tweet.data.tweet;
          else return tweet;
        });

        return { ...state, feed: updated };
      } else {
        return state;
      }

    case UPDATE_PREV:
      return { ...state, prev: action.prev, feed: [] };

    ///////////////////
    // TWEET SEARCH //
    /////////////////

    case SEARCH_TWEETS:
      if (action.initialLoad) {
        return {
          ...state,
          search: action.tweets,
        };
      } else {
        return {
          ...state,
          search: {
            ...state.search,
            results: state.search.results + action.tweets.results,
            data: {
              tweets: [
                ...state.search.data.tweets,
                ...action.tweets.data.tweets,
              ],
            },
          },
        };
      }

    case LIKE_TWEET_SEARCH:
      if (action.tweet.data) {
        const updated = state.search.data.tweets.map((tweet) => {
          if (tweet.id === action.tweet.data.tweet.id)
            return action.tweet.data.tweet;
          else return tweet;
        });

        return {
          ...state,
          search: {
            ...state.search,
            data: {
              tweets: updated,
            },
          },
        };
      }

      return state;

    case DELETE_TWEET_SEARCH:
      const filteredSearch = state.search.data.tweets.filter((tweet) => {
        return tweet.id !== action.tweetId;
      });
      return {
        ...state,
        search: {
          ...state.search,
          data: {
            tweets: filteredSearch,
          },
        },
      };

    default:
      return state;
  }
}

export default tweetReducer;
