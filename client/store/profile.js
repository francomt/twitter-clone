import axios from 'axios'

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