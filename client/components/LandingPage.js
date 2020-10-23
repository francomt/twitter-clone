import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchLogin } from "../store/profiles";
import history from "../history";

const LandingPage = ({ handleSubmit }) => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="left-body">
          <div className="left-body__header-container">
            <h5>Follow your interests.</h5>
            <h5>Hear what people are talking about</h5>
            <h5>Join the conversation</h5>
          </div>
          <svg viewBox="0 0 24 24" className="logo-landing">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <div className="right-body">
          <form
            onSubmit={handleSubmit}
            name="login"
            className="right-body__form-container"
          >
            <div className="wrapper util-margin-right-small">
              <input className="input" name="user"></input>
              <span className="input-placeholder">Username or email</span>
            </div>
            <div className="wrapper">
              <input className="input" name="password" type="password"></input>
              <span className="input-placeholder">Password</span>
            </div>

            <button
              type="submit"
              className="btn btn--login util-margin-left-small"
            >
              Log in
            </button>
          </form>

          <div className="right-body__header-container">
            <svg
              viewBox="0 0 24 24"
              className="logo-small util-align-self-start util-margin-btm-medium"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
            <h1 className="header-main util-margin-btm-large ">
              See what's happening in
              <br />
              the world right now
            </h1>
            <h5 className="header-sub util-margin-btm-small">
              Join Twitter today.
            </h5>

            <button
              onClick={() => {
                history.push("/i/signup");
              }}
              className="btn btn--solid util-margin-btm-medium"
            >
              Sign up
            </button>
            <button
              onClick={() => {
                history.push("/i/login");
              }}
              className="btn btn--outline"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer__container">
          <p>About</p>
          <p>Help Center</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p> Ads info</p>
          <p>Blog</p>
          <p>Status</p>
          <p>Careers</p>
          <p>Brand Resources</p>
          <p>Advertising</p>
          <p>Marketing</p>
          <p>Twitter for Business</p>
          <p>Developers</p>
          <p>Directory</p>
          <p>Settings</p>
        </div>
        <p>© 2020 Twitter, Inc.</p>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e) {
      e.preventDefault();
      const userInfo = e.target.user.value;
      const password = e.target.password.value;

      dispatch(fetchLogin({ userInfo, password }));
    },
  };
};

export default connect(null, mapDispatch)(LandingPage);
