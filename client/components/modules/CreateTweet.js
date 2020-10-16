import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import autosize from "autosize";
import { fetchCreateTweet } from "../../store/tweets";
import imagePreviews from "../modules/imagePreviews";

const CreateTweet = ({ handleSubmit, photo, user }) => {
  const [uploads, setUploads] = useState([]);
  const [images, setImages] = useState([]);
  const textarea = useRef(null);

  const handleChange = (e) => {
    e.persist();
    setUploads((prev) => [...prev, e.target.files[0]]);

    const fileReader = new FileReader();
    const oneImage = URL.createObjectURL(e.target.files[0]);

    setImages((prev) => [...prev, oneImage]);

    fileReader.onload = function () {
      URL.revokeObjectURL(oneImage);
    };
  };

  useEffect(() => {
    textarea.current.focus();
    autosize(textarea.current);
  }, []);

  return (
    <>
      <img src={`/img/users/${photo}`} className="tweet__profile-img" />
      <div className="create-tweet">
        <form
          className="create-form-container"
          onSubmit={(e) => {
            e.preventDefault();
            const text = e.target.text.value;

            const form = new FormData();
            form.append("text", text);
            form.append("user", user);

            if (uploads.length) {
              uploads.forEach((file) => {
                console.log("EACH FILE", file);
                form.append("images", file);
              });
            }

            handleSubmit(form);
            e.target.text.value = "";
            setImages([]);
            setUploads([]);
          }}
        >
          <textarea
            className="create-tweet__text"
            name="text"
            ref={textarea}
            placeholder="What's happening"
            rows={1}
          />

          {uploads.length ? (
            <div className="create-tweet-photos-container">
              {imagePreviews(images)}
            </div>
          ) : (
            ""
          )}

          <div className="create-tweet__bottom">
            <div className="create-tweet-image-icon-container">
              <input
                onChange={handleChange}
                className="create-tweet-input"
                type="file"
                accept="image/*"
                name="images"
                multiple={true}
              ></input>
              <svg viewBox="0 0 24 24" className="create-tweet__icon">
                <g>
                  <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                  <circle cx="8.868" cy="8.309" r="1.542"></circle>
                </g>
              </svg>
            </div>
            <button type="submit" className="btn btn--tweet">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (body) => {
      dispatch(fetchCreateTweet(body, ownProps.location));
    },
  };
};

export default connect(null, mapDispatch)(CreateTweet);
