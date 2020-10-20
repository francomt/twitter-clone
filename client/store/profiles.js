import axios from "axios";
import history from "../history";

///////////////////////////////
/////// AUTHENTICATION ///////
/////////////////////////////

//Action types
const GET_ME = "GET_ME";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_ME = "UPDATE_ME";

//Action creators
const getMe = (user) => ({ type: GET_ME, user });
const login = (user) => ({ type: LOGIN, user });
const logout = () => ({ type: LOGOUT });
const updateMe = (user) => ({ type: UPDATE_ME, user });

//Authentication thunks
export const fetchMe = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/auth/me");

      dispatch(getMe(data || {}));
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
      dispatch(login(data || {}));
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
      history.go();
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSignup = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/auth/signup", body);
      dispatch(login(data || {}));
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
};

///////////////////////////////
/////// CURRENT PROFILE //////
/////////////////////////////

//Action types
const GET_PROFILE_TWO = "GET_PROFILE";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";

//Action creators
const getProfile = (profile) => ({ type: GET_PROFILE_TWO, profile });
const followUser = (follow) => ({ type: FOLLOW_USER, follow });
const unfollowUser = (meFollowing, profileFollower) => ({
  type: UNFOLLOW_USER,
  meFollowing,
  profileFollower,
});

//Current profile thunks
export const fetchProfileTwo = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${username}`);
      dispatch(getProfile(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchFollow = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/follow`);
      dispatch(followUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUnfollow = (meFollowing, profileFollower) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/users/unfollow`, {
        followingId: meFollowing,
        followingIdTwo: profileFollower,
      });
      dispatch(unfollowUser(meFollowing, profileFollower));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProfile = (userId, body, username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`/api/users/${userId}`, body);
      dispatch(getProfile(data));
      history.push(`/${username}`);
    } catch (error) {
      console.error(error);
    }
  };
};

const defaultState = {
  me: {},
  profile: {},
};

function profilesReducer(state = defaultState, action) {
  switch (action.type) {
    // AUTHENTICATION
    case GET_ME:
      if (action.user.data) {
        return { ...state, me: action.user.data.me };
      }

      return state;

    case UPDATE_ME:
      if (action.user.data) {
        return { ...state, me: action.user.data.user };
      } else {
        return state;
      }
    case LOGIN:
      if (action.user.data) {
        return { ...state, me: action.user.data.user };
      }

      return state;
    case LOGOUT:
      return defaultState;

    //CURRENT PROFILE
    case GET_PROFILE_TWO:
      if (action.profile.data) {
        return { ...state, profile: action.profile.data.user };
      }

      return state;

    case FOLLOW_USER:
      if (action.follow.data) {
        return {
          me: {
            ...state.me,
            following: [action.follow.data.me, ...state.me.following],
          },
          profile: {
            ...state.profile,
            followers: [action.follow.data.follow, ...state.profile.followers],
          },
        };
      }
      return state;

    case UNFOLLOW_USER:
      const meFiltered = state.me.following.filter(
        (follow) => follow._id !== action.meFollowing
      );
      const profileFiltered = state.profile.followers.filter(
        (follow) => follow._id !== action.profileFollower
      );

      return {
        me: { ...state.me, following: meFiltered },
        profile: { ...state.profile, followers: profileFiltered },
      };
    default:
      return state;
  }
}

export default profilesReducer;
