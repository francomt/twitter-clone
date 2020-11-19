import React, { useEffect, useState, useRef } from "react";
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
  FollowsPage,
} from "./components";
import { CreateTweet } from "./components/modules";
import { fetchExplore } from "./store/explore";
import { fetchMe, fetchLogout, colorMode } from "./store/profiles";
import { navIcons } from "./components/modules/Svgs";
import history from "./history";

const Routes = ({
  userLoggedIn,
  loadData,
  handleLogout,
  pathname,
  me,
  colorMode,
  setMode,
  getExplore,
}) => {
  const [selectedIcon, selectIcon] = useState("home");
  const [popupFocus, setPopupFocus] = useState(false);

  const fillPage = useRef(null);
  const createTweetPopup = useRef(null);

  const settingsList = useRef(null);

  const confirmLogout = useRef(null);

  const handleLogoutConfirm = () => {
    fillPage.current.style.display = "flex";
    confirmLogout.current.style.display = "flex";
  };

  const handleLogoutClose = () => {
    fillPage.current.style.display = "none";
    confirmLogout.current.style.display = "none";
  };

  const newHeight = `${window.innerHeight - 52}px`;
  document.documentElement.style.setProperty("--height", newHeight);

  const resizeHeight = () => {
    const newHeight = `${window.innerHeight - 10}px`;
    document.documentElement.style.setProperty("--height", newHeight);
  };

  window.onresize = resizeHeight;

  const handlePopup = () => {
    fillPage.current.style.display = "flex";
    createTweetPopup.current.style.display = "flex";
    setPopupFocus(true);
  };

  const handleClose = () => {
    fillPage.current.style.display = "none";
    createTweetPopup.current.style.display = "none";
    setPopupFocus(false);
  };

  const handleSettingsOpen = () => {
    fillPage.current.style.display = "flex";
    settingsList.current.style.display = "flex";
  };

  const handleSettingsClose = () => {
    fillPage.current.style.display = "none";
    settingsList.current.style.display = "none";
  };

  useEffect(() => {
    loadData();
    getExplore();
  }, []);

  useEffect(() => {
    if (pathname === "/home") selectIcon("home");
    else if (pathname === "/explore" || pathname === "/search")
      selectIcon("explore");
    else if (pathname === "/search") selectIcon("");
    else if (me && pathname.endsWith(me.username)) selectIcon("profile");
    else selectIcon("");
  }, [me, pathname]);

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
      <Route exact path="/profile" component={withRouter(EditProfilePage)} />
      <Route exact path="/explore" component={ExplorePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/:username/following" component={FollowsPage} />
      <Route path="/:username/followers" component={FollowsPage} />
      <Route path="/:username" component={ProfilePage} />
      <Redirect from="/" to="/home" />
    </Switch>
  );

  const lightDefault = colorMode === "light" ? true : false;

  return (
    <div className="route-container">
      {userLoggedIn && pathname !== "/" && (
        <nav className="nav">
          <div className="nav__content-container">
            <svg
              onClick={() => {
                history.push("/home");
              }}
              viewBox="0 0 24 24"
              className="logo-nav util-align-self-start util-margin-btm-medium"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>

            {/* HOME */}
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

            {/* EXPLORE */}
            <div
              className="nav__item"
              onClick={() => {
                selectIcon("explore");
                history.push("/explore");
              }}
            >
              <div className="icon-container">
                {navIcons(selectedIcon, "explore")}
              </div>
              <h3 className={classValue(selectedIcon, "explore")}>Explore</h3>
            </div>

            {/* PROFILE */}
            <div
              className="nav__item"
              onClick={() => {
                selectIcon("profile");
                if (history.location.pathname !== `/${me.username}`) {
                  history.push(`/${me.username}`);
                }
              }}
            >
              <div className="icon-container">
                {navIcons(selectedIcon, "profile")}
              </div>
              <h3 className={classValue(selectedIcon, "profile")}>Profile</h3>
            </div>

            {/*  SETTINGS  */}
            <div
              className="nav__item"
              onClick={() => {
                handleSettingsOpen();
              }}
            >
              <div className="icon-container">
                {navIcons(selectedIcon, "settings")}
              </div>
              <h3 className={classValue(selectedIcon, "settings")}>Settings</h3>
            </div>

            <form
              onChange={(e) => {
                setMode(e.target.value);
              }}
              ref={settingsList}
              className="settings-list"
            >
              <h1 className="settings__header">Customize your view</h1>
              <div className="settings__container">
                <label
                  className={
                    lightDefault
                      ? "settings__light settings__selected"
                      : "settings__light"
                  }
                  htmlFor="lightMode"
                >
                  <input
                    id="lightMode"
                    type="radio"
                    name="mode"
                    value="light"
                    defaultChecked={lightDefault}
                  />
                  <p className="settings__text-light">Default</p>
                </label>

                <label
                  className={
                    !lightDefault
                      ? "settings__dark settings__selected"
                      : "settings__dark"
                  }
                  htmlFor="darkMode"
                >
                  <input
                    id="darkMode"
                    type="radio"
                    name="mode"
                    value="dark"
                    defaultChecked={!lightDefault}
                  />
                  <p className="settings__text-dark">Dim</p>
                </label>
              </div>
            </form>

            <div className="create-tweet-nav-wrapper">
              <button
                onClick={() => {
                  handlePopup();
                }}
                className="btn btn--nav-tweet"
              >
                {/* TWEET BUTTON */}
              </button>
            </div>

            <div
              ref={fillPage}
              onClick={() => {
                handleClose();
                handleSettingsClose();
                handleLogoutClose();
              }}
              className="nav__fill-page"
            ></div>

            <div ref={createTweetPopup} className="tweet-popup_container">
              <div className="tweet-popup__top">
                <svg
                  onClick={() => {
                    handleClose();
                  }}
                  viewBox="0 0 24 24"
                  className="popup__logo"
                >
                  <g>
                    <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                  </g>
                </svg>
              </div>
              <div className="tweet-popup__content">
                <CreateTweet
                  photo={me.photo}
                  user={me.id}
                  rows={6}
                  navFill={fillPage}
                  navPopup={createTweetPopup}
                  location={`/${selectedIcon}`}
                  focus={popupFocus}
                />
              </div>
            </div>

            <div className="logout-wrapper">
              <button
                className="btn btn--logout"
                onClick={() => handleLogoutConfirm()}
              >
                {/* LOG OUT BUTTON */}
              </button>
            </div>

            <div ref={confirmLogout} className="confirm-delete">
              <h1 className="confirm-delete__header">Log out of Twitter?</h1>
              <p className="confirm-delete__body">
                You can always log back in at any time.
              </p>
              <div className="confirm-delete__buttons-container">
                <button
                  onClick={handleLogoutClose}
                  className="btn btn--neutral util-margin-right-small"
                >
                  Cancel
                </button>
                <button onClick={() => handleLogout()} className="btn">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      {!userLoggedIn ? loggedOutRoutes : loggedInRoutes}
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    userLoggedIn: !!state.profilesReducer.me.id,
    me: state.profilesReducer.me,
    colorMode: state.profilesReducer.mode,
    pathname: ownProps.location.pathname,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadData: () => dispatch(fetchMe()),
    handleLogout() {
      dispatch(fetchLogout());
    },
    setMode: (mode) => dispatch(colorMode(mode)),
    getExplore: () => dispatch(fetchExplore()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
