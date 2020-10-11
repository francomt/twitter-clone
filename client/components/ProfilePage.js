import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchProfileFeed } from '../store/tweets'


const ProfilePage = ({getTweets}) => {

    useEffect(()=>{
        getTweets()
    },[])

    return <div className="profile-page-container">Profile Page!</div>
}

const mapState = (state) => {
    return {
        tweets: state.tweetReducer
    }
}


const mapDispatch = (dispatch, ownProps) => {
    const username = ownProps.match.params.username
    return {
        getTweets: ()=> dispatch(fetchProfileFeed(username))
    }
} 


export default connect(mapState, mapDispatch)(ProfilePage)