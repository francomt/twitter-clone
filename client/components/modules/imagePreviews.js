import React from "react";

const ImagePreviews = ({ arrOfImages, setImages, setUploads }) => {
  const handleDelete = (position) => {
    setImages((prev) => {
      return prev.filter((val, i) => {
        return i !== position;
      });
    });

    setUploads((prev) => {
      return prev.filter((val, i) => {
        return i !== position;
      });
    });
  };

  if (arrOfImages.length === 1) {
    return (
      <>
        <img src={arrOfImages[0]} className="tweet-photo" />
        <span
          onClick={() => {
            handleDelete(0);
          }}
          className="close-popup-preview"
        >
          X
        </span>
      </>
    );
  } else if (arrOfImages.length === 2) {
    return (
      <>
        <img src={arrOfImages[0]} className="tweet-photo-2-first" />
        <img src={arrOfImages[1]} className="tweet-photo-2-second" />

        <span
          onClick={() => {
            handleDelete(0);
          }}
          className="close-popup-preview"
        >
          X
        </span>

        <span
          onClick={() => {
            handleDelete(1);
          }}
          className="close-popup-preview close-popup-preview-2"
        >
          X
        </span>
      </>
    );
  } else if (arrOfImages.length === 3) {
    return (
      <>
        <img src={arrOfImages[0]} className="tweet-photo-3-first" />
        <img src={arrOfImages[1]} className="tweet-photo-3-second" />
        <img src={arrOfImages[2]} className="tweet-photo-3-third" />

        <span
          onClick={() => {
            handleDelete(0);
          }}
          className="close-popup-preview"
        >
          X
        </span>

        <span
          onClick={() => {
            handleDelete(1);
          }}
          className="close-popup-preview close-popup-preview-2"
        >
          X
        </span>

        <span
          onClick={() => {
            handleDelete(2);
          }}
          className="close-popup-preview close-popup-preview-3"
        >
          X
        </span>
      </>
    );
  } else if (arrOfImages.length === 4) {
    return (
      <>
        <img src={arrOfImages[0]} className="tweet-photo-4-first" />
        <img src={arrOfImages[1]} className="tweet-photo-4-second" />
        <img src={arrOfImages[3]} className="tweet-photo-4-third" />
        <img src={arrOfImages[2]} className="tweet-photo-4-fourth" />

        <span
          onClick={() => {
            handleDelete(0);
          }}
          className="close-popup-preview"
        >
          X
        </span>

        <span
          onClick={() => {
            handleDelete(1);
          }}
          className="close-popup-preview close-popup-preview-2"
        >
          X
        </span>

        <span
          onClick={() => {
            handleDelete(3);
          }}
          className="close-popup-preview close-popup-preview-3"
        >
          X
        </span>

        <span
          onClick={() => {
            handleDelete(2);
          }}
          className="close-popup-preview close-popup-preview-4"
        >
          X
        </span>
      </>
    );
  } else {
    return "";
  }
};

export default ImagePreviews;
