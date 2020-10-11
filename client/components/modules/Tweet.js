import React from 'react'

const Tweet = ({tweet}) => {

    return (
    <div className="tweet">
        <div className="tweet__share"></div>
        <div className="tweet__container">
            <div className="tweet__profile-img"></div>
            <div className="content">
                <div className="content__user">
                    <p className="content__name">{tweet.user.name}</p>
                    <p className="content__username">@{tweet.user.username}</p>
                </div>
                <p className="content__text">{tweet.text}</p>
                <div className="content__shares">
                    
                </div>
            </div>
        </div>    
    </div>
    )
}

export default Tweet