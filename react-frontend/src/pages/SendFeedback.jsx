import React from 'react'
import '../assets/styles/SendFeedback.css'

function SendFeedback() {
    return (
        <div className="feedbackContainer">
            <div className="row">
                <h1 className="feedback_heading">Contact Us</h1>
            </div>
            <div className="row">
                <h4 className="feedback_message">
                    We'd love to hear from you!
                </h4>
            </div>
            <div className="row input-container" style={{ margin: '0 auto' }}>
                <div className="col-xs-12">
                    <div className="styled-input wide">
                        <input
                            className="feedback__input"
                            type="text"
                            required
                        />
                        <label>Name</label>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="styled-input">
                        <input
                            className="feedback__input"
                            type="text"
                            required
                        />
                        <label>Email</label>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="styled-input">
                        <input
                            className="feedback__input"
                            type="text"
                            required
                        />
                        <label>Phone Number</label>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="styled-input wide">
                        <textarea
                            className="feedback__textarea"
                            required
                        ></textarea>
                        <label>Message</label>
                    </div>
                </div>
                <div className="col-xs-12">
                    <button className="btn-lrg send-submit-btn">
                        Send Feedback
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SendFeedback
