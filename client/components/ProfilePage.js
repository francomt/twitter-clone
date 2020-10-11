import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Tweet} from './modules/index'
import { fetchProfileFeed } from '../store/tweets'
import { fetchProfile } from '../store/profile'


const ProfilePage = ({getTweets, getProfile, profile, tweets}) => {

    useEffect(()=>{
        getProfile()
        getTweets()
    },[])

    return (
    <div className="profile-page-container">
        <nav className="secondary-nav">
            <h3 className="nav-text util-margin-right-large">{profile.name}</h3>
        </nav>
        <div className="profile-info-container"></div>
        <div className="profile-feed-container">
            {tweets && tweets.map((tweet) => {
                return <Tweet key={tweet.id} tweet={tweet} />
            })}
        </div>
    </div>)
}

const mapState = (state) => {
    return {
        profile: state.profileReducer,
        tweets: state.tweetReducer
    }
}


const mapDispatch = (dispatch, ownProps) => {
    const username = ownProps.match.params.username
    return {
        getProfile: ()=> dispatch(fetchProfile(username)),
        getTweets: ()=> dispatch(fetchProfileFeed(username))
    }
} 


export default connect(mapState, mapDispatch)(ProfilePage)