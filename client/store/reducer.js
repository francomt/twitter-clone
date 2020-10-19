import { combineReducers } from "redux";
import authReducer from "./auth";
import tweetReducer from "./tweets";
import profilesReducer from "./profiles";
import searchReducer from "./results";

const reducer = combineReducers({
  profilesReducer,
  tweetReducer,
  searchReducer,
});

export default reducer;
