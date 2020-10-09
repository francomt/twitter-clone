import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { LandingPage, FeedPage } from './components';
import { fetchMe } from './store/auth';

const Routes = ({ userLoggedIn, loadData }) => {
  useEffect(() => {
    console.log('LOADING');
    loadData();
  }, []);

  return (
    <div>
      <Switch>
        {/* These routes are available to all users*/}
        <Route exact path="/" component={withRouter(LandingPage)} />

        {userLoggedIn && (
          <Switch>
            {/* These routes are only accessible if a user is logged in */}
            <Route path="/home" component={FeedPage} />
          </Switch>
        )}
      </Switch>
    </div>
  );
};

const mapState = (state) => {
  return {
    userLoggedIn: !!state.authReducer.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadData: () => dispatch(fetchMe()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
