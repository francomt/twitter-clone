import { combineReducers } from 'redux';
import authReducer from './auth';
import tweetReducer from './tweets'

const reducer = combineReducers({ authReducer, tweetReducer });

export default reducer;
