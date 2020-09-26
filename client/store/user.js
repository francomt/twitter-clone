import axios from 'axios';

//ACTION TYPES
const GET_USER = 'GET_USER';

//ACTION CREATORS
const getUser = (user) => ({ type: GET_USER, user });

//THUNK CREATOR
export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/dummy');
      dispatch(getUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//initial state
const defaultUser = {};

function dummyReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.user };
    default:
      return state;
  }
}

export default dummyReducer;
