import React from "react";
import { connect } from "react-redux";
import { fetchUpdateMe } from "../store/auth";

const EditProfilePage = ({ me, handleSubmit }) => {
  return (
    <div className="edit-profile-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = new FormData();
          form.append("name", e.target.name.value);
          form.append("bio", e.target.bio.value);
          form.append("photo", e.target.photo.files[0]);

          handleSubmit(me.id, form, me.username);
        }}
        className="edit-profile"
      >
        <div>
          <img className="edit-profile__photo" src={`/img/users/${me.photo}`} />
          <input
            className="edit-profile__upload"
            type="file"
            accept="image/*"
            name="photo"
          ></input>
        </div>
        <div className="wrapper wrapper__signup">
          <input
            className="input input__signup"
            defaultValue={me.name}
            name="name"
            placeholder="Add your name"
          ></input>
          <span className="input-placeholder">Name</span>
        </div>

        <div className="wrapper wrapper__signup">
          <input
            className="input input__signup"
            defaultValue={me.bio}
            name="bio"
            placeholder="Add your bio"
          ></input>
          <span className="input-placeholder">Bio</span>
        </div>

        <button type="submit" className="btn">
          Save
        </button>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    me: state.authReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit: (userId, body, username) => {
      dispatch(fetchUpdateMe(userId, body, username));
    },
  };
};

export default connect(mapState, mapDispatch)(EditProfilePage);
