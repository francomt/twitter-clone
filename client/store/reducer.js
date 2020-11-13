import { combineReducers } from "redux";
import tweetReducer from "./tweets";
import profilesReducer from "./profiles";
import exploreReducer from "./explore";

const reducer = combineReducers({
  profilesReducer,
  tweetReducer,
  exploreReducer,
});

export default reducer;
