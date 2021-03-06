import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSignup } from "../store/profiles";
import history from "../history";
import { debounce } from "lodash";
const validator = require("validator");

const SignupPage = ({ handleSubmit, err }) => {
  const [nameErr, setNameErr] = useState(false);
  const [usernameErr, setUsernameErr] = useState(false);
  const [usernameMsg, setUsernameMsg] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [pass, setPassword] = useState("");
  const [passConfirmErr, setPassConfirmErr] = useState(false);

  const nameInputClass = nameErr
    ? "input-error input-error__signup"
    : "input input__signup";

  const nameLabelClass = nameErr
    ? "input-placeholder-error"
    : "input-placeholder";

  const usernamePattern = /^[a-zA-Z0-9_]{5,15}$/;

  const usernameInputClass = usernameErr
    ? "input-error input-error__signup"
    : "input input__signup";

  const usernameLabelClass = usernameErr
    ? "input-placeholder-error"
    : "input-placeholder";

  const emailInputClass = emailErr
    ? "input-error input-error__signup"
    : "input input__signup";

  const emailLabelClass = emailErr
    ? "input-placeholder-error"
    : "input-placeholder";

  const passwordInputClass = passwordErr
    ? "input-error input-error__signup"
    : "input input__signup";

  const passwordLabelClass = passwordErr
    ? "input-placeholder-error"
    : "input-placeholder";

  const passConfirmInputClass =
    passConfirmErr && !passwordErr
      ? "input-error input-error__signup"
      : "input input__signup";

  const passConfirmLabelClass =
    passConfirmErr && !passwordErr
      ? "input-placeholder-error"
      : "input-placeholder";

  const nameInput = useRef(null);

  const handleName = debounce((text) => {
    if (text.length === 0) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
  }, 450);

  const disabledForm =
    nameErr || usernameErr || emailErr || passwordErr || passConfirmErr;

  const handleUsername = debounce((text) => {
    if (text.length < 5) {
      setUsernameErr(true);
      setUsernameMsg("Your username must be longer than 4 characters.");
    } else if (text.length > 15) {
      setUsernameErr(true);
      setUsernameMsg("Your username must be shorter than 15 characters.");
    } else if (!usernamePattern.test(text)) {
      setUsernameErr(true);
      setUsernameMsg("Your username can only contain letters, numbers and '_'");
    } else {
      setUsernameErr(false);
      setUsernameMsg("");
    }
  }, 450);

  const handleEmail = debounce((text) => {
    if (!validator.isEmail(text)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  }, 450);

  const handlePassword = debounce((text) => {
    if (text.length < 8) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  }, 450);

  const handlePasswordConfirm = debounce((text) => {
    if (text !== pass) {
      setPassConfirmErr(true);
    } else {
      setPassConfirmErr(false);
    }
  }, 500);

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const passwordConfirm = e.target.passwordConfirm.value;

        if (
          !name ||
          !username ||
          !email ||
          !password ||
          !passwordConfirm ||
          disabledForm
        ) {
          return;
        } else {
          handleSubmit({ name, username, email, password, passwordConfirm });
        }
      }}
      className="signup-page-container"
    >
      <svg
        viewBox="0 0 24 24"
        onClick={() => {
          history.push("/");
        }}
        className="back-arrow"
      >
        <g>
          <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
        </g>
      </svg>
      <form className="signup">
        <svg viewBox="0 0 24 24" className="logo-small signup__logo">
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
        <h1 className="header-main header-main--primary util-align-self-start util-margin-btm-medium">
          Create your account
        </h1>
        {err !== undefined && <p className="landing-err">{err}</p>}
        <div className="wrapper wrapper__signup">
          <input
            ref={nameInput}
            onChange={(e) => {
              handleName(e.target.value);
            }}
            className={nameInputClass}
            name="name"
          ></input>
          <span className={nameLabelClass}>Name</span>
          {nameErr && <p className="signup-error">What's your name?</p>}
        </div>

        <div className="wrapper wrapper__signup">
          <input
            className={usernameInputClass}
            name="username"
            onChange={(e) => {
              handleUsername(e.target.value);
            }}
          ></input>
          <span className={usernameLabelClass}>Username</span>
          {usernameErr && <p className="signup-error">{usernameMsg}</p>}
        </div>

        <div className="wrapper wrapper__signup">
          <input
            onChange={(e) => {
              handleEmail(e.target.value);
            }}
            className={emailInputClass}
            name="email"
          ></input>
          <span className={emailLabelClass}>Email</span>
          {emailErr && (
            <p className="signup-error">Please enter a valid email.</p>
          )}
        </div>

        <div className="wrapper wrapper__signup">
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              handlePassword(e.target.value);
            }}
            className={passwordInputClass}
            name="password"
            type="password"
          ></input>
          <span className={passwordLabelClass}>Password</span>
          {passwordErr && (
            <p className="signup-error">
              Your password needs to be at least 8 characters.
            </p>
          )}
        </div>

        <div className="wrapper wrapper__signup">
          <input
            onChange={(e) => {
              handlePasswordConfirm(e.target.value);
            }}
            className={passConfirmInputClass}
            name="passwordConfirm"
            type="password"
          ></input>
          <span className={passConfirmLabelClass}>Confirm Password</span>
          {passConfirmErr && !passwordErr && (
            <p className="signup-error">Passwords do not match.</p>
          )}
        </div>

        <button type="submit" className="btn">
          Sign up
        </button>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    err: state.profilesReducer.errMsg,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit: (obj) => dispatch(fetchSignup(obj)),
  };
};

export default connect(mapState, mapDispatch)(SignupPage);
