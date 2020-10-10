import React from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../store/auth';

const FeedPage = ({ me }) => {
  return (
    <div className="feed-page-container">
      
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
