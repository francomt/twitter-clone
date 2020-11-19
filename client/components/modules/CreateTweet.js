import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import autosize from "autosize";
import { fetchCreateTweet } from "../../store/tweets";
import { ImagePreviews } from "../modules/";
import imageCompression from "browser-image-compression";
import Loader from "react-loader-spinner";

const CreateTweet = ({
  handleSubmit,
  photo,
  user,
  rows,
  navFill,
  navPopup,
  focus,
}) => {
  const [uploads, setUploads] = useState([]);
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const textarea = useRef(null);

  const imgErr = useRef(null);

  useEffect(() => {
    setLoading(false);
  }, [images]);

  const handleImage = async (i, fileReader, e) => {
    setLoading(true);

    const testing = await imageCompression(e.target.files[i], {
      maxSizeMB: 0.3,
    });

    const newFile = new File([testing], "test.jpeg", {
      type: e.target.files[i].type,
    });

    setUploads((prev) => [...prev, newFile]);
    const oneImage = URL.createObjectURL(newFile);
    setImages((prev) => [...prev, oneImage]);
    fileReader.onload = function () {
      URL.revokeObjectURL(oneImage);
    };
  };

  const handleImgError = () => {
    imgErr.current.style.display = "flex";
    setTimeout(() => {
      imgErr.current.style.display = "none";
    }, 7050);
  };

  const handleChange = (e) => {
    e.persist();

    const files = e.target.files;

    if (uploads.length < 4) {
      const fileReader = new FileReader();

      if (files[0]) {
        if (files[0].size > 2107152) {
          handleImgError();
        } else {
          handleImage(0, fileReader, e);
        }
      }

      if (files[1] && uploads.length < 4) {
        if (files[1].size > 2107152) {
          handleImgError();
        } else {
          handleImage(1, fileReader, e);
        }
      }

      if (files[2] && uploads.length < 4) {
        if (files[2].size > 2107152) {
          handleImgError();
        } else {
          handleImage(2, fileReader, e);
        }
      }

      if (files[3] && uploads.length < 4) {
        if (files[3].size > 2107152) {
          handleImgError();
        } else {
          handleImage(3, fileReader, e);
        }
      }
    } else {
      return;
    }
  };

  const handleOnClick = (e) => {
    e.target.value = "";
  };

  useEffect(() => {
    if (focus) {
      textarea.current.focus();
    }
    autosize(textarea.current);
  }, [focus]);

  const canUpload = text.length || images.length;

  const tweetBtnClass = canUpload
    ? "btn btn--tweet"
    : "btn btn--tweet-disabled";

  return (
    <>
      <img src={photo} className="tweet__profile-img" />
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
                form.append("images", file);
              });
            }

            if (images.length || text) {
              handleSubmit(form);
              e.target.text.value = "";
              setImages([]);
              setUploads([]);

              if (navFill) {
                navFill.current.style.display = "none";
                navPopup.current.style.display = "none";
              }
            } else {
              if (navFill) {
                navFill.current.style.display = "none";
                navPopup.current.style.display = "none";
              }
              return;
            }
          }}
        >
          <textarea
            className="create-tweet__text"
            name="text"
            ref={textarea}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="What's happening?"
            rows={images.length ? 2 : rows}
          />

          {loading ? (
            <Loader
              type="Oval"
              color="#1da1f2"
              height={40}
              width={40}
              style={{ margin: "25px", alignSelf: "center" }}
            />
          ) : (
            uploads.length > 0 && (
              <div className="create-tweet-photos-container">
                <ImagePreviews
                  arrOfImages={images}
                  uploads={uploads}
                  setImages={setImages}
                  setUploads={setUploads}
                />
              </div>
            )
          )}

          <div ref={imgErr} className="img-size-err">
            One or more images exceeds the size limit and cannot be resized.
          </div>

          <div className="create-tweet__bottom">
            <div className="create-tweet-image-icon-container">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                onClick={(e) => {
                  handleOnClick(e);
                }}
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

            <button
              type="submit"
              className={tweetBtnClass}
              disabled={!canUpload}
            >
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
