import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchDeleteTweet, fetchFeed } from '../store/tweets';
import {CreateTweet, Tweet} from './modules/index'
import {debounce} from 'lodash'
import axios from 'axios'

class FeedPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      query: "",
      results: [],
      loading: false,
      message: ""
    }
    this.cancel = ""
    this.handleInputChange = this.handleInputChange.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
  }

  componentDidMount() {
    this.props.getFeed(this.props.me.id)
  }

  async fetchResults(updatedPageNum = "", query){
    const pageNum = updatedPageNum ? `&page=${updatedPageNum}` : "";

    const url = `/api/users/search?username=${query}&page=${pageNum}&limit=4`

    if (this.cancel) {
      //cancel previous request before making a new request
      this.cancel.cancel()
    }

   //Create cancel token
   this.cancel = axios.CancelToken.source()

   axios.get(url, {
      cancelToken: this.cancel.token
   }).then(res=> {
      const noResults = !res.results ? "No results" : ""

      this.setState({
        results: res.data.data.users,
        message: noResults,
        loading: false
      })

   }).catch((err)=> {
      if (axios.isCancel(err) || err) {

        this.setState({
          loading: false,
          message: "Failed search. Please check network"
        })
      }
   })

}

  handleInputChange = debounce((text) => {
    const query = text

    if (!query) {
      this.setState({query, results: [], message: ""})
    } else {
      this.setState({query, loading: true, message: ""}, ()=> {
        this.fetchResults(1, query)
      })
    }
  }, 1500)
  
  render() {

    const {location, feed, me, deleteTweet} = this.props

    return(
    <div className="feed-page-container">
      <nav className="secondary-nav">
        <h3 className="nav-text util-margin-right-large">Home</h3>
        <input onChange={(e) => this.handleInputChange(e.target.value)} className="searchbar util-margin-auto-left util-margin-right-large" placeholder="Search Twitter"></input>
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
