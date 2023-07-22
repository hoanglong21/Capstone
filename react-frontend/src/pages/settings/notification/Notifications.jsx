import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import UserSettingService from '../../../services/UserSettingService'

import FormStyles from '../../../assets/styles/Form.module.css'
import './notification.css'

const Notifications = () => {
    const { userInfo } = useSelector((state) => state.user)

    const [isStudyReminder, setIsStudyReminder] = useState(true)
    const [studyReminder, setStudyReminder] = useState({})
    const [isAssignDueDate, setIsAssignDueDate] = useState(true)
    const [assignDueDate, setAssignDueDate] = useState({})
    const [isTestDueDate, setIsTestDueDate] = useState(true)
    const [testDueDate, setTestDueDate] = useState({})
    const [setAdded, setSetAdded] = useState({})
    const [postAdded, setPostAdded] = useState({})
    const [assignAssigned, setAssignAssigned] = useState({})
    const [testAssigned, setTestAssigned] = useState({})
    const [submitGraded, setSubmitGraded] = useState({})

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const settings = (
                    await UserSettingService.getUserSettingByUserId(userInfo.id)
                ).data
                for (const setting of settings) {
                    switch (setting.setting.id) {
                        case 1:
                            setStudyReminder({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 1,
                                },
                                value: setting.value,
                            })
                            setIsStudyReminder(setting.value ? true : false)
                            break
                        case 3:
                            setAssignDueDate({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 3,
                                },
                                value: setting.value,
                            })
                            setIsAssignDueDate(setting.value ? true : false)
                            break
                        case 4:
                            setTestDueDate({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 4,
                                },
                                value: setting.value,
                            })
                            setIsTestDueDate(setting.value ? true : false)
                            break
                        case 5:
                            setSetAdded({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 5,
                                },
                                value: setting.value,
                            })
                            break
                        case 6:
                            setPostAdded({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 6,
                                },
                                value: setting.value,
                            })
                            break
                        case 7:
                            setAssignAssigned({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 7,
                                },
                                value: setting.value,
                            })
                            break
                        case 8:
                            setTestAssigned({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 8,
                                },
                                value: setting.value,
                            })
                            break
                        case 9:
                            setSubmitGraded({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                setting: {
                                    id: 9,
                                },
                                value: setting.value,
                            })
                            break
                        default:
                            break
                    }
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const handleSave = () => {}

    return (
        <div className="mx-5 ps-5">
            <h4>Email Notification</h4>
            <div className="mt-4">
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>STUDY REMINDERS</legend>
                    <input
                        className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                        type="checkbox"
                        checked={isStudyReminder}
                        id="studyReminder"
                        onChange={(event) => {
                            setIsStudyReminder(event.target.checked)
                        }}
                    />
                    <label className="form-check-label" htmlFor="studyReminder">
                        Email reminders
                    </label>
                    <div className="mt-2 notification_formTime">
                        <label
                            htmlFor="studyReminderTime"
                            className="form-label"
                        >
                            Time of day:
                        </label>
                        <input
                            type="time"
                            className={`form-control ${FormStyles.formControl} ms-0`}
                            id="studyReminderTime"
                            value={studyReminder?.value || ''}
                            disabled={!isStudyReminder}
                            onChange={(event) => {
                                setStudyReminder(event.target.value)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>DUE DATE REMINDERS</legend>
                    <div className="mb-3">
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={isAssignDueDate}
                            id="assignmentReminder"
                            onChange={(event) => {
                                setIsAssignDueDate(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="assignmentReminder"
                        >
                            Assignment reminders
                        </label>
                        <div className="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-2">
                                    <label
                                        htmlFor="assignDueDateReminderTime"
                                        className="form-label"
                                    >
                                        Before (hours):
                                    </label>
                                </div>
                                <div className="col-10 notification_formTime">
                                    <input
                                        type="number"
                                        className={`form-control ${FormStyles.formControl} ms-0`}
                                        id="assignDueDateReminderTime"
                                        disabled={!isAssignDueDate}
                                        value={assignDueDate?.value || ''}
                                        onChange={(event) => {
                                            setAssignDueDate(event.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={isTestDueDate}
                            id="testReminder"
                            onChange={(event) => {
                                setIsTestDueDate(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="testReminder"
                        >
                            Test reminders
                        </label>
                        <div className="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-2">
                                    <label
                                        htmlFor="testDueDateReminderTime"
                                        className="form-label"
                                    >
                                        Before (hours):
                                    </label>
                                </div>
                                <div className="col-10 notification_formTime">
                                    <input
                                        type="number"
                                        className={`form-control ${FormStyles.formControl} ms-0`}
                                        id="testDueDateReminderTime"
                                        disabled={!isTestDueDate}
                                        value={testDueDate?.value || ''}
                                        onChange={(event) => {
                                            setTestDueDate(event.target.value)
                                        }}
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
                            id="setAdded"
                            checked={setAdded?.value || true}
                            onChange={(event) => {
                                setSetAdded(event.target.checked)
                            }}
                        />
                        <label className="form-check-label" htmlFor="setAdded">
                            A set is added
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="postPosted"
                            checked={postAdded?.value || true}
                            onChange={(event) => {
                                setPostAdded(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="postPosted"
                        >
                            A post is posted
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="assignmentAssigned"
                            checked={assignAssigned?.value || true}
                            onChange={(event) => {
                                setAssignAssigned(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="assignmentAssigned"
                        >
                            An assignment is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="testAssigned"
                            checked={testAssigned?.value || true}
                            onChange={(event) => {
                                setTestAssigned(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="testAssigned"
                        >
                            A test is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="submissionGraded"
                            checked={submitGraded?.value || true}
                            onChange={(event) => {
                                setSubmitGraded(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="submissionGraded"
                        >
                            Your submission is graded
                        </label>
                    </div>
                </fieldset>
                <button
                    className="btn btn-primary px-4 mt-4"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
export default Notifications
