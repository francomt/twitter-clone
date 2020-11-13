import axios from "axios";

//ACTION TYPES
const GET_EXPLORE = "GET_EXPLORE";

const getExplore = (results) => ({
  type: GET_EXPLORE,
  results,
});

export const fetchExplore = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://api.datanews.io/v1/news?apiKey=02q3ltc2vp4erdnxtx7mw5vcs&topic=general&size=25"
      );

      dispatch(getExplore(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const defaultState = [];

function exploreReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_EXPLORE:
      return action.results;
    default:
      return state;
  }
}

export default exploreReducer;
