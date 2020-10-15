import React from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../store/profile';


const EditProfilePage = ({profile, handleSubmit}) => {

    return (
        <div className="edit-profile-container">

            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(profile.id, {name: e.target.name.value}, profile.username)
                }} className="edit-profile">

                <img className="edit-profile__photo" src={`/img/users/${profile.photo}`} />

                <div className="wrapper wrapper__signup">
                    <input className="input input__signup" defaultValue={profile.name} name="name" placeholder="Add your name"></input>
                    <span className="input-placeholder">
                        Name
                    </span>
                </div>

                <button type="submit" className="btn">Save</button>
                {/* <div className="wrapper wrapper__signup">
                    <input className="input input__signup" defaultValue={me.name} name="bio" placeholder="Add your bio"></input>
                    <span className="input-placeholder">
                        Bio
                    </span>
                </div> */}

            </form>

        </div>
    )
}

const mapState = state => {
    return {
        profile: state.profileReducer
    }
}

const mapDispatch = dispatch => {
    return {
        handleSubmit: (userId, body, username) => {
            dispatch(updateProfile(userId, body, username))
        },
    }
}

export default connect(mapState, mapDispatch)(EditProfilePage)