import axios from "axios";
import history from "../history";

//ACTION TYPES
const GET_FEED = "GET_FEED";
const GET_PROFILE_FEED = "GET_PROFILE_FEED";
const CREATE_TWEET = "CREATE_TWEET";
const DELETE_TWEET = "DELETE_TWEET";

const getFeed = (feed, prev) => ({ type: GET_FEED, feed, prev });
const getProfileFeed = (feed, prev) => ({ type: GET_PROFILE_FEED, feed, prev });
const createTweet = (tweet, pathname) => ({
  type: CREATE_TWEET,
  tweet,
  pathname,
});
const deleteTweet = (tweetId) => ({ type: DELETE_TWEET, tweetId });

export const fetchFeed = (userId, page = 1) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/${userId}/feed?page=${page}&limit=25`
      );
      dispatch(getFeed(data, history.location.pathname));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchProfileFeed = (username, page = 1) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/${username}/tweets?page=${page}&limit=25`
      );
      dispatch(getProfileFeed(data, history.location.pathname));
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

const defaultState = {
  prev: "",
  feed: [],
};

function tweetReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_FEED:
      if (action.feed.data) {
        if (action.prev !== state.prev) {
          return { prev: action.prev, feed: [...action.feed.data.tweets] };
        } else {
          return {
            prev: action.prev,
            feed: [...state.feed, ...action.feed.data.tweets],
          };
        }
      } else {
        return state;
      }
    case GET_PROFILE_FEED:
      if (action.feed.data) {
        if (action.prev !== state.prev) {
          return { prev: action.prev, feed: [...action.feed.data.tweets] };
        } else {
          return {
            prev: action.prev,
            feed: [...state.feed, ...action.feed.data.tweets],
          };
        }
      } else {
        return state;
      }
    case CREATE_TWEET:
      if (action.tweet.data) {
        if (action.pathname === "/home") {
          return {
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
      return { prev: state.prev, feed: filtered };
    default:
      return state;
  }
}

export default tweetReducer;
