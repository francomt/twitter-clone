import axios from 'axios'
import history from '../history'

const GET_PROFILE = "GET_PROFILE"

const getProfile = (profile) => ({type: GET_PROFILE, profile})

export const fetchProfile = (username) => {
    return async dispatch => {
        try {
            const {data} = await axios.get(`/api/users/${username}`)
            dispatch(getProfile(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const updateProfile = (userId, body, username) => {
    return async dispatch => {
        try {
            const {data} = await axios.patch(`/api/users/${userId}`, body)
            dispatch(getProfile(data))
            history.push(`/${username}`)
        } catch (error) {
            console.error(error)
        }
    }
}

const defaultState = {}

function profileReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_PROFILE:
            if (action.profile.data) {
                return {...action.profile.data.user}
            } else {
                return state
            }
        default:
            return state
    }
}

export default profileReducer