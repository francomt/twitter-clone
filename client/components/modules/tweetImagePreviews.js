import React from "react";

const imagePreviews = (arrOfImages) => {
  if (arrOfImages.length === 1) {
    return <img src={arrOfImages[0]} className="tweet-photo" />;
  } else if (arrOfImages.length === 2) {
    return (
      <>
        <img src={arrOfImages[0]} className="tweet-photo-2-first" />
        <img src={arrOfImages[1]} className="tweet-photo-2-second" />
      </>
    );
  } else if (arrOfImages.length === 3) {
    return (
      <>
        <img src={arrOfImages[0]} className="tweet-photo-3-first" />
        <img src={arrOfImages[1]} className="tweet-photo-3-second" />
        <img src={arrOfImages[2]} className="tweet-photo-3-third" />
      </>
    );
  } else if (arrOfImages.length === 4) {
    return (
      <>
        <img src={arrOfImages[0]} className="tweet-photo-4-first" />
        <img src={arrOfImages[1]} className="tweet-photo-4-second" />
        <img src={arrOfImages[2]} className="tweet-photo-4-third" />
        <img src={arrOfImages[3]} className="tweet-photo-4-fourth" />
      </>
    );
  } else {
    return "";
  }
};

export default imagePreviews;
