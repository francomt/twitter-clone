import { combineReducers } from "redux";
import authReducer from "./auth";
import tweetReducer from "./tweets";
import profileReducer from "./profile";
import searchReducer from "./results";

const reducer = combineReducers({
  authReducer,
  tweetReducer,
  profileReducer,
  searchReducer,
});

export default reducer;
