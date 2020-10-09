import React from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../store/auth';

const FeedPage = ({ handleLogout, me }) => {
  return (
    <div>
      <h1>You are logged in {me.name}</h1>
      <button className="btn" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
};

const mapState = (state) => {
  return {
    me: state.authReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(fetchLogout());
    },
  };
};

export default connect(mapState, mapDispatch)(FeedPage);
