import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { fetchDeleteTweet, fetchFeed } from '../store/tweets';
import {CreateTweet, Tweet} from './modules/index'
import axios from 'axios'
import { render } from 'node-sass';

const FeedPage = ({ me, getFeed, feed, location, deleteTweet }) => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [cancel, setCancel] = useState("")

  useEffect(()=> {
    getFeed(me.id)
  }, [])

  const fetchResults = (updatedPageNum = "", query) => {
    const pageNum = updatedPageNum ? `&page=${updatedPageNum}` : "";

    const url = `/api/users/search?username=${query}&page=${pageNum}&limit=4`

    if (cancel) {
      //cancel previous request before making a new request
      cancel.cancel()
    }

    //Create cancel token
    setCancel(axios.CancelToken.source())

    axios.get(url, {
      cancelToken: cancel
    }).then((res)=> {
      const noResults = !res.results ? "No results" : ""

      setResults(res.data.users)
      setMessage(noResults)
      setLoading(false)
    }).catch((err)=> {
        if (axios.isCancel(err) || err) {
          setLoading(false)
          setMessage("Failed search. Please check network")
        }
    })
  }


  const handleInputChange = (e) => {
    const query = e.target.value

    if (!query) {
      setQuery(query)
      setResults([])
      setMessage("")
    } else {
      setQuery(query)
      setLoading(true)
      setMessage("")
    }
} 

 
  return (
    <div className="feed-page-container">
      <nav className="secondary-nav">
        <h3 className="nav-text util-margin-right-large">Home</h3>
        <input onChange={handleInputChange} className="searchbar util-margin-auto-left util-margin-right-large" placeholder="Search Twitter"></input>
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
