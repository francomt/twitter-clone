import axios from "axios";
import history from "../history";

const GET_PROFILE = "GET_PROFILE";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";

const getProfile = (profile) => ({ type: GET_PROFILE, profile });
const followUser = (follow) => ({ type: FOLLOW_USER, follow });
const unfollowUser = (followId) => ({ type: UNFOLLOW_USER, followId });

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

export const fetchUnfollow = (followIdOne, followIdTwo) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/users/unfollow`, {
        followingId: followIdOne,
        followingIdTwo: followIdTwo,
      });
      dispatch(unfollowUser(followIdOne));
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

const defaultState = {};

function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_PROFILE:
      console.log("HERE");
      if (action.profile.data) {
        return { ...action.profile.data.user };
      } else {
        return state;
      }

    case FOLLOW_USER:
      if (action.follow.data) {
        return {
          ...state,
          followers: [action.follow.data.follow, ...state.followers],
        };
      } else return state;

    case UNFOLLOW_USER:
      const filtered = state.followers.filter((follow) => {
        return follow._id !== action.followId;
      });
      return {
        ...state,
        followers: filtered,
      };
    default:
      return state;
  }
}

export default profileReducer;
