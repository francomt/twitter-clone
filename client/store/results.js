import axios from "axios";
import history from "../history";

//ACTION TYPES
const SEARCH_TWEETS = "SEARCH_TWEETS";

const searchTweets = (tweets) => ({ type: SEARCH_TWEETS, tweets });

export const fetchSearchTweets = (query, page = 1) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/tweets/search?text=${query}&page=${page}&limit=5`
      );
      dispatch(searchTweets(data));
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
        return { ...state, tweets: [...action.tweets.data.tweets] };
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default searchReducer;
