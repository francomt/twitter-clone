import React, { useState, useRef } from "react";

const imagePreviews = (arrOfImages) => {
  const fill = useRef(null);
  const closeButton = useRef(null);
  const image = useRef(null);

  const leftArrow = useRef(null);
  const rightArrow = useRef(null);

  const [pic, setPic] = useState(null);

  const handleCurrentPicture = (val, last) => {
    if (val === 0) {
      leftArrow.current.style.display = "none";
    } else {
      leftArrow.current.style.display = "flex";
    }

    if (val === last) {
      rightArrow.current.style.display = "none";
    } else {
      rightArrow.current.style.display = "flex";
    }

    image.current.src = arrOfImages[val];
  };

  const singleOpen = () => {
    fill.current.style.display = "flex";
    image.current.style.display = "flex";
    closeButton.current.style.display = "flex";
  };

  const singleClose = () => {
    fill.current.style.display = "none";
    image.current.style.display = "none";
    closeButton.current.style.display = "none";
  };

  const handleFillOpen = () => {
    fill.current.style.display = "flex";
    image.current.style.display = "flex";
    closeButton.current.style.display = "flex";
  };

  const handleCloseFill = () => {
    fill.current.style.display = "none";
    image.current.style.display = "none";
    closeButton.current.style.display = "none";

    if (leftArrow.current) {
      leftArrow.current.style.display = "none";
    }

    if (rightArrow.current) {
      rightArrow.current.style.display = "none";
    }
  };

  if (arrOfImages.length === 1) {
    return (
      <>
        <img
          onClick={() => {
            singleOpen();
          }}
          src={arrOfImages[0]}
          className="tweet-photo"
        />
        <div ref={fill} className="fill-page-tweet"></div>
        <span
          ref={closeButton}
          onClick={() => {
            singleClose();
          }}
          className="close-popup"
        >
          X
        </span>
        <img ref={image} className="fill-page-image" src={arrOfImages[0]}></img>
      </>
    );
  } else if (arrOfImages.length === 2) {
    return (
      <>
        <img
          onClick={() => {
            handleCurrentPicture(0);
            setPic(0);
            handleFillOpen();
          }}
          src={arrOfImages[0]}
          className="tweet-photo-2-first"
        />
        <img
          onClick={() => {
            handleCurrentPicture(1, 1);
            setPic(1);
            handleFillOpen();
          }}
          src={arrOfImages[1]}
          className="tweet-photo-2-second"
        />
        <div ref={fill} className="fill-page-tweet"></div>
        <span
          ref={closeButton}
          onClick={() => {
            handleCloseFill();
          }}
          className="close-popup"
        >
          X
        </span>

        <span
          ref={leftArrow}
          onClick={() => {
            if (pic !== 0) {
              handleCurrentPicture(pic - 1);
              setPic(pic - 1);
            }
          }}
          className="slideshow slideshow-left"
        >
          ←
        </span>

        <span
          ref={rightArrow}
          onClick={() => {
            if (pic !== 1) {
              handleCurrentPicture(pic + 1, 1);
              setPic(pic + 1);
            }
          }}
          className="slideshow slideshow-right"
        >
          →
        </span>
        <img ref={image} className="fill-page-image" src={arrOfImages[0]}></img>
      </>
    );
  } else if (arrOfImages.length === 3) {
    return (
      <>
        <img
          onClick={() => {
            handleCurrentPicture(0);
            setPic(0);
            handleFillOpen();
          }}
          src={arrOfImages[0]}
          className="tweet-photo-3-first"
        />
        <img
          onClick={() => {
            handleCurrentPicture(1);
            setPic(1);
            handleFillOpen();
          }}
          src={arrOfImages[1]}
          className="tweet-photo-3-second"
        />
        <img
          onClick={() => {
            handleCurrentPicture(2, 2);
            setPic(2);
            handleFillOpen();
          }}
          src={arrOfImages[2]}
          className="tweet-photo-3-third"
        />

        <div ref={fill} className="fill-page-tweet"></div>
        <span
          ref={closeButton}
          onClick={() => {
            handleCloseFill();
          }}
          className="close-popup"
        >
          X
        </span>
        <span
          ref={leftArrow}
          onClick={() => {
            if (pic !== 0) {
              handleCurrentPicture(pic - 1);
              setPic(pic - 1);
            }
          }}
          className="slideshow slideshow-left"
        >
          ←
        </span>
        <span
          ref={rightArrow}
          onClick={() => {
            if (pic !== 2) {
              handleCurrentPicture(pic + 1, 2);
              setPic(pic + 1);
            }
          }}
          className="slideshow slideshow-right"
        >
          →
        </span>
        <img ref={image} className="fill-page-image" src={arrOfImages[0]}></img>
      </>
    );
  } else if (arrOfImages.length === 4) {
    return (
      <>
        <img
          onClick={() => {
            handleCurrentPicture(0);
            setPic(0);
            handleFillOpen();
          }}
          src={arrOfImages[0]}
          className="tweet-photo-4-first"
        />
        <img
          onClick={() => {
            handleCurrentPicture(1);
            setPic(1);
            handleFillOpen();
          }}
          src={arrOfImages[1]}
          className="tweet-photo-4-second"
        />
        <img
          onClick={() => {
            handleCurrentPicture(3, 3);
            setPic(3);
            handleFillOpen();
          }}
          src={arrOfImages[3]}
          className="tweet-photo-4-third"
        />
        <img
          onClick={() => {
            handleCurrentPicture(2);
            setPic(2);
            handleFillOpen();
          }}
          src={arrOfImages[2]}
          className="tweet-photo-4-fourth"
        />

        <div ref={fill} className="fill-page-tweet"></div>
        <span
          ref={closeButton}
          onClick={() => {
            handleCloseFill();
          }}
          className="close-popup"
        >
          X
        </span>
        <span
          ref={leftArrow}
          onClick={() => {
            if (pic !== 0) {
              handleCurrentPicture(pic - 1);
              setPic(pic - 1);
            }
          }}
          className="slideshow slideshow-left"
        >
          ←
        </span>
        <span
          ref={rightArrow}
          onClick={() => {
            if (pic !== 3) {
              handleCurrentPicture(pic + 1, 3);
              setPic(pic + 1);
            }
          }}
          className="slideshow slideshow-right"
        >
          →
        </span>
        <img ref={image} className="fill-page-image" src={arrOfImages[0]}></img>
      </>
    );
  } else {
    return "";
  }
};

export default imagePreviews;
