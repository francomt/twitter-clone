import { combineReducers } from 'redux';
import authReducer from './auth';
import tweetReducer from './tweets'
import profileReducer from './profile'

const reducer = combineReducers({ authReducer, tweetReducer, profileReducer });

export default reducer;
