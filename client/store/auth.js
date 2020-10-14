import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_ME = 'GET_ME';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SIGNUP = 'SIGNUP';

//ACTION CREATORS
const getMe = (user) => ({ type: GET_ME, user });
const login = (user) => ({ type: LOGIN, user });
const logout = () => ({ type: LOGOUT });

const defaultUser = {};

//THUNK CREATOR
export const fetchMe = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/auth/me');

      dispatch(getMe(data || defaultUser));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchLogin = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/auth/login', body);
      dispatch(login(data || defaultUser));
      history.push('/home');
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchLogout = () => {
  return async (dispatch) => {
    try {
      await axios.get('/api/auth/logout');
      dispatch(logout());
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSignup = (body) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/auth/signup', body)
      dispatch(login(data || defaultUser));
      history.push('/home');
    } catch (error) {
      console.error(error)
    }
  }
}



function authReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_ME:
      if (action.user.data) {
        return { ...action.user.data.me };
      } else {
        return { ...action.user };
      }
    case LOGIN:
      if (action.user.data) {
        return { ...action.user.data.user };
      } else {
        return { ...action.user };
      }
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export default authReducer;
