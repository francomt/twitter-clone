import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Home, Example } from './components';
import { fetchUser } from './store/user';

const Routes = ({ userLoggedIn, loadData }) => {
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Switch>
        {/* These routes are available to all users*/}
        <Route exact path="/" component={withRouter(Home)} />

        {userLoggedIn && (
          <Switch>
            {/* These routes are only accessible if a user is logged in */}
            <Route path="/example" component={Example} />
          </Switch>
        )}
      </Switch>
    </div>
  );
};

const mapState = (state) => {
  return {
    userLoggedIn: !!state.dummyReducer.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadData: () => dispatch(fetchUser()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
