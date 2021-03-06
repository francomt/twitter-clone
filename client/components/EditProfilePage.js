import React, { useEffect, useRef } from "react";
import history from "../history";
import { connect } from "react-redux";
import { fetchUpdateMe } from "../store/profiles";
import { fetchUpdatePrev } from "../store/tweets";
import Loader from "react-loader-spinner";

const EditProfilePage = ({ me, handleSubmit, updatePrev }) => {
  const output = useRef(null);
  const outputCover = useRef(null);

  useEffect(() => {
    updatePrev(history.location.pathname);
  }, []);

  const loadingFill = useRef(null);

  const handleChange = async (e) => {
    if (e.target.files[0].size > 4007152) {
      handleImgError();
    } else {
      output.current.src = URL.createObjectURL(e.target.files[0]);
      output.current.onload = function () {
        URL.revokeObjectURL(output.src);
      };
    }
  };

  const handleChangeCover = (e) => {
    if (e.target.files[0].size > 4007152) {
      handleImgError();
    } else {
      outputCover.current.src = URL.createObjectURL(e.target.files[0]);
      outputCover.current.onload = function () {
        URL.revokeObjectURL(outputCover.src);
      };
    }
  };

  const imgErr = useRef(null);

  const handleImgError = () => {
    imgErr.current.style.display = "flex";
    setTimeout(() => {
      imgErr.current.style.display = "none";
    }, 7050);
  };

  return (
    <div className="edit-profile-container">
      <div ref={loadingFill} className="loading-fill">
        <Loader type="Oval" color="#1da1f2" height={40} width={40} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = new FormData();
          form.append("name", e.target.name.value);
          form.append("bio", e.target.bio.value);
          if (e.target.photo.files) {
            form.append("photo", e.target.photo.files[0]);
          }
          if (e.target.coverImg.files) {
            form.append("coverImg", e.target.coverImg.files[0]);
          }

          loadingFill.current.style.display = "flex";

          handleSubmit(me.id, form, me.username);
        }}
        className="edit-profile"
      >
        <div className="edit-profile-photo-container">
          <div className="edit-profile__coverImg-container">
            <img
              ref={outputCover}
              src={me.coverImg}
              className="edit-profile__coverImg"
            />
            <input
              onChange={handleChangeCover}
              className="edit-profile__upload-cover"
              type="file"
              accept="image/*"
              name="coverImg"
            ></input>
            <svg
              viewBox="0 0 24 24"
              className="edit-profile__upload-cover__icon-cover"
            >
              <g>
                <path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path>
                <path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
              </g>
            </svg>
          </div>
          <div className="edit-profile__photo-container">
            <img ref={output} className="edit-profile__photo" src={me.photo} />
            <input
              onChange={handleChange}
              className="edit-profile__upload"
              type="file"
              accept="image/*"
              name="photo"
            ></input>
            <svg viewBox="0 0 24 24" className="edit-profile__upload__icon">
              <g>
                <path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path>
                <path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
              </g>
            </svg>
          </div>
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
      <div ref={imgErr} className="img-size-err-edit">
        One or more images exceeds the size limit and cannot be resized.
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    me: state.profilesReducer.me,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit: (userId, body, username) => {
      dispatch(fetchUpdateMe(userId, body, username));
    },
    updatePrev: (path) => {
      dispatch(fetchUpdatePrev(path));
    },
  };
};

export default connect(mapState, mapDispatch)(EditProfilePage);
