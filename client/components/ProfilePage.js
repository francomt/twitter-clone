import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Tweet} from './modules/index'
import { fetchProfileFeed } from '../store/tweets'
import { fetchProfile } from '../store/profile'


const ProfilePage = ({getTweets, getProfile, profile, tweets, me}) => {

    useEffect(()=>{
        getProfile()
        getTweets()
    },[])

    return (
    <div className="profile-page-container">
        <nav className="secondary-nav">
            <h3 className="nav-text util-margin-right-large">{profile.name}</h3>
        </nav>
        <div className="profile-bottom-half style-scrollbars">
            <div className="profile-info-container"></div>
            <div className="profile-feed-container">
                {tweets && tweets.map((tweet) => {
                    return <Tweet key={tweet.id} tweet={tweet} me={me}/>
                })}
            </div>
        </div>
    </div>)
}

const mapState = (state) => {
    return {
        profile: state.profileReducer,
        tweets: state.tweetReducer,
        me: state.authReducer
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