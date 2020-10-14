import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchDeleteTweet, fetchFeed } from '../store/tweets';
import {CreateTweet, Tweet} from './modules/index'
import {debounce} from 'lodash'
import axios from 'axios'

const FeedPage = ({location, feed, me, deleteTweet, getFeed}) => {

  useEffect(()=>{
    getFeed(me.id)
  }, [])

  let cancelToken

  const handleSearchChange = debounce(async (text) => {
    
    const query = text

    //Check for previous request
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel("Canceled due to new request")
    }

    //Save the cancel token for current request
    cancelToken = axios.CancelToken.source()

    try {

      const url = `/api/users/search?username=${query}&page=1&limit=4`

      const {data} = await axios.get(url, { cancelToken: cancelToken.token })

      console.log(query, data.data.users)
    } catch (error) {
      console.error(error)
    }

  }, 1000)

  
  return(
        <div className="feed-page-container">
          <nav className="secondary-nav">
            <h3 className="nav-text util-margin-right-large">Home</h3>
            <input onChange={(e) => handleSearchChange(e.target.value)} className="searchbar util-margin-auto-left util-margin-right-large" placeholder="Search Twitter"></input>
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
              
        </div>)

}

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
