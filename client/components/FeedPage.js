import React from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../store/auth';

const FeedPage = ({ handleLogout, me }) => {
  return (
    <div className="feed-page-container">
      <button className="btn" onClick={() => handleLogout()}>
        Logout
      </button>
      <div className="feed-container"></div>
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
