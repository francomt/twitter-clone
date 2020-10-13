import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchDeleteTweet, fetchFeed } from '../store/tweets';
import {CreateTweet, Tweet} from './modules/index'

const FeedPage = ({ me, getFeed, feed, location, deleteTweet }) => {

  useEffect(()=> {
    getFeed(me.id)
  }, [])

 

  return (
    <div className="feed-page-container">
      <nav className="secondary-nav">
        <h3 className="nav-text util-margin-right-large">Home</h3>
        <input className="searchbar util-margin-auto-left util-margin-right-large" placeholder="Search Twitter"></input>
      </nav>
      <div className="feed-page-half style-scrollbars">
        <div className="feed-middle">
          <div className="create-tweet-container">
            <CreateTweet location={location}/>
          </div>
          <div className="feed-container">
              {feed && feed.map(tweet => {
                return <Tweet key={tweet.id} tweet={tweet} me={me} deleteTweet={deleteTweet}/>
              })}
          </div>
        </div>
      </div>
      
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    me: state.authReducer,
    feed: state.tweetReducer,
    location: ownProps.location.pathname
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFeed: (userId) => dispatch(fetchFeed(userId)),
    deleteTweet: (tweetId) => dispatch(fetchDeleteTweet(tweetId))
  };
};

export default connect(mapState, mapDispatch)(FeedPage);
