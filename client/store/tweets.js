import axios from 'axios'

//ACTION TYPES
const GET_FEED = "GET_FEED"
const GET_PROFILE_FEED = "GET_PROFILE_FEED"

const getFeed = (feed) => ({type: GET_FEED, feed})
const getProfileFeed = (feed) => ({type: GET_PROFILE_FEED, feed})

export const fetchFeed = (userId) => {
  return async dispatch => {
    try {
        const {data} = await axios.get(`/api/users/${userId}/feed`)
        dispatch(getFeed(data))
    } catch (error) {
        console.error(error)
    }
}}

export const fetchProfileFeed = (username) => {
    return async dispatch => {
        try {
            const {data} = await axios.get(`/api/users/${username}/tweets`)
            dispatch(getProfileFeed(data))
        } catch (error) {
            console.error(error)
        }
    }
}

const defaultState = []

function tweetReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_FEED:
            if (action.feed.data) {
                return [...action.feed.data.tweets]
            } else {
                return state
            }
        case GET_PROFILE_FEED:
            if (action.feed.data) {
                return [...action.feed.data.tweets]
            } else {
                return state
            }
        default:
            return state;
    }
}

export default tweetReducer