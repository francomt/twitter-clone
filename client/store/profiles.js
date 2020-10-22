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
const GET_PROFILE = "GET_PROFILE";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const QUICK_FOLLOW = "QUICK_FOLLOW";
const QUICK_UNFOLLOW = "QUICK_UNFOLLOW";

//Action creators
const getProfile = (profile) => ({ type: GET_PROFILE, profile });
const followUser = (follow) => ({ type: FOLLOW_USER, follow });
const unfollowUser = (meFollowing, profileFollower) => ({
  type: UNFOLLOW_USER,
  meFollowing,
  profileFollower,
});

const quickFollow = (follow, userId, followType, selected) => ({
  type: QUICK_FOLLOW,
  follow,
  userId,
  followType,
  selected,
});
const quickUnfollow = (meFollowing, profileFollower) => ({
  type: QUICK_UNFOLLOW,
  meFollowing,
  profileFollower,
});

//Current profile thunks
export const fetchProfile = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${username}`);
      dispatch(getProfile(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchProfileFollows = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${username}/follows`);
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

export const fetchQuickFollow = (userId, followType, selected) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/follow`);
      dispatch(quickFollow(data, userId, followType, selected));
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

export const fetchQuickUnfollow = (meFollowing, profileFollower) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/users/unfollow`, {
        followingId: meFollowing,
        followingIdTwo: profileFollower,
      });
      dispatch(quickUnfollow(meFollowing));
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

///////////////////////////////
//////// USER SEARCH  ////////
/////////////////////////////

const SEARCH_USERS = "SEARCH_USERS";

const searchUsers = (users, initialLoad) => ({
  type: SEARCH_USERS,
  users,
  initialLoad,
});

export const fetchSearchUsers = (query, page = 1, initialLoad = false) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/search?username=${query}&page=${page}&limit=10`
      );
      dispatch(searchUsers(data, initialLoad));
    } catch (error) {
      console.error(error);
    }
  };
};

const defaultState = {
  me: {},
  profile: {},
  search: {},
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
    case GET_PROFILE:
      if (action.profile.data) {
        return { ...state, profile: action.profile.data.user };
      }

      return state;

    case FOLLOW_USER:
      if (action.follow.data) {
        return {
          ...state,
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
        ...state,
        me: { ...state.me, following: meFiltered },
        profile: { ...state.profile, followers: profileFiltered },
      };

    case SEARCH_USERS:
      if (action.initialLoad) {
        return {
          ...state,
          search: action.users,
        };
      } else {
        return {
          ...state,
          search: {
            ...state.search,
            results: state.search.results + action.users.results,
            data: {
              users: [...state.search.data.users, ...action.users.data.users],
            },
          },
        };
      }

    case QUICK_FOLLOW:
      console.log(action);

      let userResults;

      if (action.followType === "page") {
        userResults = state.profile[action.selected].map((user) => {
          if (user.id === action.userId) {
            user.followers = [action.follow.data.follow._id, ...user.followers];
            return user;
          }

          return user;
        });
      } else {
        userResults = state.search.data.users.map((user) => {
          if (user.id === action.userId) {
            user.followers = [action.follow.data.follow._id, ...user.followers];
            return user;
          }

          return user;
        });
      }

      if (action.follow.data) {
        if (action.followType === "page") {
          return {
            ...state,
            me: {
              ...state.me,
              following: [action.follow.data.me, ...state.me.following],
            },
            profile: {
              ...state.profile,
              [action.selected]: userResults,
            },
          };
        } else {
          return {
            ...state,
            me: {
              ...state.me,
              following: [action.follow.data.me, ...state.me.following],
            },
            search: {
              ...state.search,
              data: {
                users: userResults,
              },
            },
          };
        }
      }

      return state;

    case QUICK_UNFOLLOW:
      const meSearchFiltered = state.me.following.filter(
        (follow) => follow._id !== action.meFollowing
      );

      return {
        ...state,
        me: { ...state.me, following: meSearchFiltered },
      };

    default:
      return state;
  }
}

export default profilesReducer;
