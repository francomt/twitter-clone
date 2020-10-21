import { combineReducers } from "redux";
import tweetReducer from "./tweets";
import profilesReducer from "./profiles";

const reducer = combineReducers({
  profilesReducer,
  tweetReducer,
});

export default reducer;
