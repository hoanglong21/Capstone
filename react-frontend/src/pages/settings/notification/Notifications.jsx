import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import FormStyles from '../../../assets/styles/Form.module.css'
import './notification.css'

const Notifications = () => {
    const { userInfo } = useSelector((state) => state.user)

    const [settings, setSettings] = useState({})

    useEffect(() => {
      const fetchData = () => {
        
      }
    
      return () => {
        second
      }
    }, [third])
    

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className="mx-5 ps-5">
            <h4>Email Notification</h4>
            <form className="mt-4" noValidate>
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>STUDY REMINDERS</legend>
                    <input
                        className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                        type="checkbox"
                        value=""
                        id="studyReminder"
                    />
                    <label className="form-check-label" for="studyReminder">
                        Email reminders
                    </label>
                    <div class="mt-2 notification_formTime">
                        <label for="studyReminderTime" class="form-label">
                            Time of day:
                        </label>
                        <input
                            type="time"
                            class={`form-control ${FormStyles.formControl} ms-0`}
                            id="studyReminderTime"
                        />
                    </div>
                </fieldset>
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>DUE DATE REMINDERS</legend>
                    <div className="mb-3">
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            value=""
                            id="assignmentReminder"
                        />
                        <label
                            className="form-check-label"
                            for="assignmentReminder"
                        >
                            Assignment reminders
                        </label>
                        <div class="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-2">
                                    <label
                                        for="assignDueDateReminderTime"
                                        class="form-label"
                                    >
                                        Before (hours):
                                    </label>
                                </div>
                                <div className="col-10 notification_formTime">
                                    <input
                                        type="number"
                                        class={`form-control ${FormStyles.formControl} ms-0`}
                                        id="assignDueDateReminderTime"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            value=""
                            id="testReminder"
                        />
                        <label className="form-check-label" for="testReminder">
                            Test reminders
                        </label>
                        <div class="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-2">
                                    <label
                                        for="testDueDateReminderTime"
                                        class="form-label"
                                    >
                                        Before (hours):
                                    </label>
                                </div>
                                <div className="col-10 notification_formTime">
                                    <input
                                        type="number"
                                        class={`form-control ${FormStyles.formControl} ms-0`}
                                        id="testDueDateReminderTime"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="form-check notification_formContainer mb-3 ps-0">
                    <legend>IN YOUR CLASS, RECEIVE EMAIL WHEN:</legend>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            value=""
                            id="setAdded"
                        />
                        <label className="form-check-label" for="setAdded">
                            A set is added
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            value=""
                            id="postPosted"
                        />
                        <label className="form-check-label" for="postPosted">
                            A post is posted
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            value=""
                            id="assignmentAssigned"
                        />
                        <label
                            className="form-check-label"
                            for="assignmentAssigned"
                        >
                            An assignment is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            value=""
                            id="testAssigned"
                        />
                        <label className="form-check-label" for="testAssigned">
                            A test is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            value=""
                            id="submissionGraded"
                        />
                        <label
                            className="form-check-label"
                            for="submissionGraded"
                        >
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
