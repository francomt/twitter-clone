import axios from "axios";
import history from "../history";

//ACTION TYPES
const SEARCH_TWEETS = "SEARCH_TWEETS";
const LIKE_TWEET_SEARCH = "LIKE_TWEET_SEARCH";
const DELETE_TWEET_SEARCH = "DELETE_TWEET_SEARCH";

const searchTweets = (tweets, prev) => ({ type: SEARCH_TWEETS, tweets, prev });
const likeTweet = (tweet) => ({ type: LIKE_TWEET_SEARCH, tweet });
const deleteTweet = (tweetId) => ({ type: DELETE_TWEET_SEARCH, tweetId });

export const fetchSearchTweets = (query, page = 1) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/tweets/search?text=${query}&page=${page}&limit=8`
      );
      dispatch(searchTweets(data, history.location.search));
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

    default:
      return state;
  }
}

export default searchReducer;
