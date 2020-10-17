import axios from "axios";
import history from "../history";

//ACTION TYPES TWEETS
const SEARCH_TWEETS = "SEARCH_TWEETS";
const LIKE_TWEET_SEARCH = "LIKE_TWEET_SEARCH";
const DELETE_TWEET_SEARCH = "DELETE_TWEET_SEARCH";
const TWEET_SWITCH = "TWEET_SWITCH";

const searchTweets = (tweets, prev) => ({ type: SEARCH_TWEETS, tweets, prev });
const likeTweet = (tweet) => ({ type: LIKE_TWEET_SEARCH, tweet });
const deleteTweet = (tweetId) => ({ type: DELETE_TWEET_SEARCH, tweetId });
const tweetSwitch = (tweets, prev) => ({ type: TWEET_SWITCH, tweets, prev });

export const fetchSearchTweets = (query, page = 1) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/tweets/search?text=${query}&page=${page}&limit=25`
      );
      dispatch(searchTweets(data, history.location.search));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchTweetSwitch = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/tweets/search?text=${query}&page=1&limit=8`
      );
      dispatch(tweetSwitch(data, history.location.search));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchLikeTweetSearch = (tweetId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tweets/like/${tweetId}`);
      dispatch(likeTweet(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUnlikeTweetSearch = (tweetId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tweets/unlike/${tweetId}`);
      dispatch(likeTweet(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchDeleteTweetSearch = (tweetId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/tweets/${tweetId}`);
      dispatch(deleteTweet(tweetId));
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

//ACTION TYPES USERS
const SEARCH_USERS = "SEARCH_USERS";
const USERS_SWITCH = "USERS_SWITCH";

const searchUsers = (users, prev) => ({ type: SEARCH_USERS, users, prev });
const usersSwitch = (users, prev) => ({ type: USERS_SWITCH, users, prev });

export const fetchSearchUsers = (query, page = 1) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/search?username=${query}&page=${page}&limit=25`
      );
      dispatch(searchUsers(data, history.location.search));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUsersSwitch = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/search?username=${query}&page=1&limit=25`
      );
      dispatch(usersSwitch(data, history.location.search));
    } catch (error) {
      console.error(error);
    }
  };
};

const defaultState = {
  prev: "",
  tweets: [],
  users: [],
};

function searchReducer(state = defaultState, action) {
  switch (action.type) {
    case SEARCH_TWEETS:
      if (action.tweets.data) {
        if (action.prev !== state.prev) {
          return {
            prev: action.prev,
            users: [...state.users],
            tweets: [...action.tweets.data.tweets],
          };
        } else {
          return {
            prev: action.prev,
            users: [...state.users],
            tweets: [...state.tweets, ...action.tweets.data.tweets],
          };
        }
      } else {
        return state;
      }

    case TWEET_SWITCH:
      if (action.tweets.data) {
        return {
          prev: action.prev,
          users: [...state.users],
          tweets: [...action.tweets.data.tweets],
        };
      } else {
        return state;
      }
    case LIKE_TWEET_SEARCH:
      if (action.tweet.data) {
        const updated = state.tweets.map((tweet) => {
          if (tweet.id === action.tweet.data.tweet.id)
            return action.tweet.data.tweet;
          else return tweet;
        });

        return { ...state, tweets: updated };
      } else {
        return state;
      }

    case DELETE_TWEET_SEARCH:
      const filtered = [...state.tweets].filter((tweet) => {
        return tweet.id !== action.tweetId;
      });
      return { ...state, tweets: filtered };

    //USERS //////////////////////////////
    case SEARCH_USERS:
      if (action.users.data) {
        if (action.prev !== state.prev) {
          return {
            prev: action.prev,
            users: [...action.users.data.users],
            tweets: [...state.tweets],
          };
        } else {
          return {
            prev: action.prev,
            users: [...state.users, ...action.users.data.users],
            tweets: [...state.tweets],
          };
        }
      } else {
        return state;
      }

    case USERS_SWITCH:
      if (action.users.data) {
        return {
          prev: action.prev,
          users: [...action.users.data.users],
          tweets: [...state.tweets],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default searchReducer;
