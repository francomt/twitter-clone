import React, {useRef} from 'react'

const Tweet = ({tweet, me, deleteTweet}) => {

    const fillPage = useRef(null)
    const popupEl = useRef(null)

    const fillPageConfirm = useRef(null)

    const handlePopup = () => {
        fillPage.current.style.display = "block"
        popupEl.current.style.display = "flex"
    }

    const handleClose = () => {
        fillPage.current.style.display = "none"
        popupEl.current.style.display = "none"
    }

    const handleConfirm = () => {
        fillPageConfirm.current.style.display = "flex"
        fillPage.current.style.display = "none"
        popupEl.current.style.display = "none"
    }

    const handleCloseConfirm = () => {
        fillPageConfirm.current.style.display = "none"
        fillPage.current.style.display = "block"
        popupEl.current.style.display = "flex"
    }

    return (
    <div className="tweet">
        <div className="tweet__share"></div>
        <div className="tweet__container">
            <div className="tweet__profile-img"></div>
            <div className="content">
                <div className="content__user">
                    <p className="content__name">{tweet.user.name}</p>
                    <p className="content__username">@{tweet.user.username}</p>

                    {/* Popup */}
                    {me.id === tweet.user.id && (<div className="tweet-popup-container">
                        <svg onClick={handlePopup} viewBox="0 0 24 24" className="content__popup"><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>
                        <div onClick={handleClose} ref={fillPage} className="popup-fill-page"></div>
                        <div ref={popupEl} className="popup-content">
                            <div onClick={handleConfirm} className="popup-content__list">
                                <svg viewBox="0 0 24 24" className="popup-content__delete-icon"><g><path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path><path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path></g></svg>
                                <p className="popup-content__delete-text">Delete</p>
                            </div>
                        </div>
                        
                    </div>)}
                    <div className="confirm-delete-container" ref={fillPageConfirm} onClick={handleCloseConfirm}>
                        <div className="confirm-delete">
                            <h1 className="confirm-delete__header">Delete Tweet?</h1>
                            <p className="confirm-delete__body">This can't be undone and it will be<br/>removed from your profile, the timeline<br/>of any accounts that follow you, and<br/>from Tweeter search results.</p>
                            <div className="confirm-delete__buttons-container">
                                <button onClick={handleCloseConfirm} className="btn btn--neutral util-margin-right-small">Cancel</button>
                                <button onClick={()=> {deleteTweet(tweet.id)}} className="btn btn--red">Delete</button>
                            </div>
                        </div>
                    </div>
                    
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