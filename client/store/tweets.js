import axios from 'axios'

//ACTION TYPES
const GET_FEED = "GET_FEED"
const GET_PROFILE_FEED = "GET_PROFILE_FEED"
const CREATE_TWEET = "CREATE_TWEET"
const DELETE_TWEET = "DELETE_TWEET"

const getFeed = (feed) => ({type: GET_FEED, feed})
const getProfileFeed = (feed) => ({type: GET_PROFILE_FEED, feed})
const createTweet = (tweet, pathname) => ({type: CREATE_TWEET, tweet, pathname})
const deleteTweet = (tweetId) => ({type: DELETE_TWEET, tweetId})

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

export const fetchCreateTweet = (body, pathname) => {
    return async dispatch => {
        try {
            const {data} = await axios.post('/api/tweets/', body)
            dispatch(createTweet(data, pathname))
        } catch (error) {
            console.error(error)
        }
    }
}

export const fetchDeleteTweet = (tweetId) => {
    return async dispatch => {
        try {
            await axios.delete(`/api/tweets/${tweetId}`)
            dispatch(deleteTweet(tweetId))
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
        case CREATE_TWEET:
            if (action.tweet.data) {
                if (action.pathname === '/home') {
                    return [action.tweet.data.tweet, ...state]
                } else {
                    return state
                }
            } else {
                return state
            }
        case DELETE_TWEET:
            const filtered = [...state].filter(tweet => {
                return tweet.id !== action.tweetId
            })
            return filtered
        default:
            return state;
    }
}

export default tweetReducer