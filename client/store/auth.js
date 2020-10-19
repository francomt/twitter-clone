import axios from "axios";
import history from "../history";

//ACTION TYPES
const GET_ME = "GET_ME";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_ME = "UPDATE_ME";
const UNFOLLOW_AUTH = "UNFOLLOW_AUTH";

//ACTION CREATORS
const getMe = (user) => ({ type: GET_ME, user });
const login = (user) => ({ type: LOGIN, user });
const logout = () => ({ type: LOGOUT });
const updateMe = (user) => ({ type: UPDATE_ME, user });
export const unfollowAuth = (followId) => ({
  type: UNFOLLOW_AUTH,
  followId,
});

const defaultUser = {};

//THUNK CREATOR
export const fetchMe = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/auth/me");

      dispatch(getMe(data || defaultUser));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUpdateMe = (userId, body, username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`/api/users/${userId}`, body);
      dispatch(updateMe(data));
      history.push(`/${username}`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchLogin = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/auth/login", body);
      dispatch(login(data || defaultUser));
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchLogout = () => {
  return async (dispatch) => {
    try {
      await axios.get("/api/auth/logout");
      dispatch(logout());
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSignup = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/auth/signup", body);
      dispatch(login(data || defaultUser));
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
};

function authReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_ME:
      console.log("HERE", action);
      if (action.user.data) {
        return { ...action.user.data.me };
      } else {
        return { ...action.user };
      }
    case UPDATE_ME:
      if (action.user.data) {
        return { ...action.user.data.user };
      } else {
        return state;
      }
    case LOGIN:
      if (action.user.data) {
        return { ...action.user.data.user };
      } else {
        return { ...action.user };
      }
    case LOGOUT:
      return {};

    case UNFOLLOW_AUTH:
      const filtered = state.following.filter((follow) => {
        return follow._id !== action.followId;
      });
      return {
        ...state,
        following: filtered,
      };
    default:
      return state;
  }
}

export default authReducer;
