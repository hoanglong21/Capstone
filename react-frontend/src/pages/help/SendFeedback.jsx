import '../../assets/styles/SendFeedback.css'

const SendFeedback = () => {
    const handleSubmit = () => {}

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
            <form>
                <div
                    className="row input-container"
                    style={{ margin: '0 auto' }}
                >
                    <div className="col-xs-12">
                        <h7 for="type">Choose your type feedback: </h7>
                        <div className="styled-input wide">
                            <select className="feedback__input" id="type">
                                <option value="Sexual Content">
                                    Sexual Content
                                </option>
                                <option value="Violent or repulsive Content">
                                    Violent or repulsive Content
                                </option>
                                <option value="Hateful or Abusive">
                                    Hateful or Abusive
                                </option>
                                <option value="Misinformation">
                                    Misinformation
                                </option>
                                <option value="Harmful or Dangerous Acts">
                                    Harmful or Dangerous Acts
                                </option>
                                <option value="Infringes Rights">
                                    Infringes Rights
                                </option>
                                <option value="Caption Issue">
                                    Caption Issue
                                </option>
                                <option value="Suggestions">Suggestions</option>
                                <option value="Promotes Terrorism">
                                    Promotes Terrorism
                                </option>
                                <option value="Spam or Misleading">
                                    Spam or Misleading
                                </option>
                                <option value="Harassment or Bullying">
                                    Harassment or Bullying
                                </option>
                                <option value="Child abuse">Child abuse</option>
                            </select>
                        </div>
                    </div>
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
                            <label>Content</label>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <button
                            className="btn-lrg send-submit-btn"
                            onClick={handleSubmit}
                        >
                            Send Feedback
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SendFeedback
