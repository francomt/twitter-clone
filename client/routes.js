import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  LandingPage,
  FeedPage,
  ProfilePage,
  SignupPage,
  LoginPage,
  EditProfilePage,
  SearchPage,
  ExplorePage,
} from "./components";
import { fetchMe, fetchLogout } from "./store/auth";
import { navIcons } from "./components/modules/Svgs";
import history from "./history";

const Routes = ({ userLoggedIn, loadData, handleLogout, pathname, me }) => {
  const [selectedIcon, selectIcon] = useState("home");

  useEffect(() => {
    loadData();

    if (pathname === "/home") {
      selectIcon("home");
    } else if (pathname === "/settings") {
      selectIcon("settings");
    } else if (pathname !== "/") {
      selectIcon("profile");
    }
  }, []);

  //For selected icon
  const classValue = (currentVal, icon) => {
    if (currentVal === icon) return "nav-text nav-text--selected";
    else return "nav-text";
  };

  const loggedOutRoutes = (
    <Switch>
      <Route exact path="/" component={withRouter(LandingPage)} />
      <Route exact path="/i/signup" component={withRouter(SignupPage)} />
      <Route exact path="/i/login" component={LoginPage} />
      <Redirect from="/home" to="/" />
    </Switch>
  );

  const loggedInRoutes = (
    <Switch>
      <Redirect from="/i/login" to="/home" />
      <Redirect from="/i/signup" to="/home" />
      <Route path="/home" component={FeedPage} />
      <Route exact path="/profile" component={EditProfilePage} />
      <Route exact path="/explore" component={ExplorePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/:username" component={ProfilePage} />
      <Redirect from="/" to="/home" />
    </Switch>
  );

  return (
    <div className="route-container">
      {userLoggedIn && pathname !== "/" && (
        <nav className="nav">
          <svg
            viewBox="0 0 24 24"
            className="logo-nav util-align-self-start util-margin-btm-medium"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
          <div
            className="nav__item"
            onClick={() => {
              selectIcon("home");
              history.push("/home");
            }}
          >
            <div className="icon-container">
              {navIcons(selectedIcon, "home")}
            </div>
            <h3 className={classValue(selectedIcon, "home")}>Home</h3>
          </div>
          <div
            className="nav__item"
            onClick={() => {
              selectIcon("profile");
              history.push(`/${me.username}`);
            }}
          >
            <div className="icon-container">
              {navIcons(selectedIcon, "profile")}
            </div>
            <h3 className={classValue(selectedIcon, "profile")}>Profile</h3>
          </div>
          <div
            className="nav__item"
            onClick={() => {
              selectIcon("settings");
            }}
          >
            <div className="icon-container">
              {navIcons(selectedIcon, "settings")}
            </div>
            <h3 className={classValue(selectedIcon, "settings")}>Settings</h3>
          </div>

          <div>
            <button className="btn btn--login" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </nav>
      )}
      {!userLoggedIn ? loggedOutRoutes : loggedInRoutes}
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    userLoggedIn: !!state.authReducer.id,
    me: state.authReducer,
    pathname: ownProps.location.pathname,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadData: () => dispatch(fetchMe()),
    handleLogout() {
      dispatch(fetchLogout());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
