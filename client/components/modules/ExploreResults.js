import React from "react";
import tweetImagePreview from "./tweetImagePreviews";

const ExploreResults = ({ results, type }) => {
  if (type === "quick") {
    return (
      <>
        {results.status === 200 &&
          results.hits.map((article, i) => {
            return (
              <div
                onClick={() => {
                  window.location.assign(article.url);
                }}
                key={article.pubDate + i}
                className="result-explore"
              >
                <div className="explore-content">
                  <p className="content__title">{article.title}</p>
                  <p className="content__source">{article.source}</p>
                </div>
                <div className="explore-picture">
                  {tweetImagePreview([article.imageUrl])}
                </div>
              </div>
            );
          })}
      </>
    );
  } else
    return (
      <>
        {results.status === 200 && (
          <div
            className="main-result"
            onClick={() => {
              window.location.assign(results.hits[0].url);
            }}
          >
            <div className="explore-picture-main">
              {tweetImagePreview([results.hits[0].imageUrl])}
              <div className="explore-content-main">
                <p className="content__title-main">{results.hits[0].title}</p>
              </div>
            </div>
          </div>
        )}
        {results.status === 200 &&
          results.hits.map((article, i) => {
            if (i !== 0)
              return (
                <div
                  onClick={() => {
                    window.location.assign(article.url);
                  }}
                  key={article.pubDate + i}
                  className="result-explore"
                >
                  <div className="explore-content">
                    <p className="content__title">{article.title}</p>
                    <p className="content__source">{article.source}</p>
                    <p className="content__description">
                      {article.description}
                    </p>
                  </div>
                  <div className="explore-picture">
                    {tweetImagePreview([article.imageUrl])}
                  </div>
                </div>
              );
          })}
      </>
    );
};

export default ExploreResults;
