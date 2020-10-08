import React from 'react';

const Home = () => {
  return (
    <div className="main-body">
      <div className="left-body"></div>
      <div className="right-body">
        <div className="header-container">
          <h1>
            See what's happening in
            <br />
            the world right now
          </h1>
          <h5 className="header header--sub">Join Twitter today.</h5>

          <button className="btn btn-solid">Sign up</button>
          <button className="btn btn-outline">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
