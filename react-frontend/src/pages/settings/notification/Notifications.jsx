import FormStyles from '../../../assets/styles/Form.module.css'
import './notification.css'

const Notifications = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className="mx-5 ps-3">
            <h4>Email Notification</h4>
            <form className="mt-4" noValidate>
                <fieldset className="notification_label form-check mb-4">
                    <legend>STUDY REMINDERS</legend>
                    <input
                        className={`form-check-input ${FormStyles.formCheckInput}`}
                        type="checkbox"
                        value=""
                        id="studyReminder"
                    />
                    <label className="form-check-label" for="studyReminder">
                        Email reminders
                    </label>
                    <div class="mb-3">
                        <label
                            for="exampleFormControlInput1"
                            class="form-label"
                        >
                            Time of day:
                        </label>
                        <input
                            type="time"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                        />
                    </div>
                </fieldset>
                <fieldset className="form-check">
                    <legend>IN YOUR CLASS, RECEIVE EMAIL WHEN:</legend>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="studyReminder"
                        />
                        <label className="form-check-label" for="studyReminder">
                            A set is added
                        </label>
                    </div>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="studyReminder"
                        />
                        <label className="form-check-label" for="studyReminder">
                            A post is posted
                        </label>
                    </div>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="studyReminder"
                        />
                        <label className="form-check-label" for="studyReminder">
                            An assignment is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="studyReminder"
                        />
                        <label className="form-check-label" for="studyReminder">
                            A test is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="studyReminder"
                        />
                        <label className="form-check-label" for="studyReminder">
                            Your submission is graded
                        </label>
                    </div>
                </fieldset>
                <button
                    className="btn btn-primary px-4 mt-4"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </form>
        </div>
    )
}
export default Notifications
