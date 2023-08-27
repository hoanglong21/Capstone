import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import UserSettingService from '../../../services/UserSettingService'

import FormStyles from '../../../assets/styles/Form.module.css'
import './notification.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Notifications = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.user)

    const [isStudyReminder, setIsStudyReminder] = useState(true)
    const [studyReminder, setStudyReminder] = useState({ value: '00:00' })
    const [isAssignDueDate, setIsAssignDueDate] = useState(true)
    const [assignDueDate, setAssignDueDate] = useState({ value: '0' })
    const [isTestDueDate, setIsTestDueDate] = useState(true)
    const [testDueDate, setTestDueDate] = useState({ value: '0' })
    const [setAdded, setSetAdded] = useState({ value: true })
    const [postAdded, setPostAdded] = useState({ value: true })
    const [assignAssigned, setAssignAssigned] = useState({ value: true })
    const [testAssigned, setTestAssigned] = useState({ value: true })
    const [submitGraded, setSubmitGraded] = useState({ value: true })

    const [successMess, setSuccessMess] = useState(false)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const settings = (
                    await UserSettingService.customSettings(userInfo.id)
                ).data
                // study reminder
                setStudyReminder({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 1,
                    },
                    value: settings['study reminder'],
                })
                setIsStudyReminder(
                    settings['study reminder'].toLowerCase() == 'false'
                        ? false
                        : true
                )
                // assign due date
                setAssignDueDate({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 3,
                    },
                    value: settings['assignment due date reminder'],
                })
                setIsAssignDueDate(
                    settings['assignment due date reminder'].toLowerCase() ==
                        'false'
                        ? false
                        : true
                )
                // test due date
                setTestDueDate({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 4,
                    },
                    value: settings['test due date reminder'],
                })
                setIsTestDueDate(
                    settings['test due date reminder'].toLowerCase() == 'false'
                        ? false
                        : true
                )
                // set added
                setSetAdded({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 5,
                    },
                    value:
                        settings['set added'].toLowerCase() == 'false'
                            ? false
                            : true,
                })
                // post added
                setPostAdded({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 6,
                    },
                    value:
                        settings['post added'].toLowerCase() == 'false'
                            ? false
                            : true,
                })
                // assign assigned
                setAssignAssigned({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 7,
                    },
                    value:
                        settings['assignment assigned'].toLowerCase() == 'false'
                            ? false
                            : true,
                })
                // test assigned
                setTestAssigned({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 8,
                    },
                    value:
                        settings['test assigned'].toLowerCase() == 'false'
                            ? false
                            : true,
                })
                // submit graded
                setSubmitGraded({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 9,
                    },
                    value:
                        settings['submission graded'].toLowerCase() == 'false'
                            ? false
                            : true,
                })
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const handleSave = async () => {
        setSuccessMess(false)
        try {
            // study reminder
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                studyReminder.setting.id,
                studyReminder.value
            )
            // assign due date
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                assignDueDate.setting.id,
                assignDueDate.value
            )
            // test due date
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                testDueDate.setting.id,
                testDueDate.value
            )
            // set added
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                setAdded.setting.id,
                setAdded.value
            )
            // post added
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                postAdded.setting.id,
                postAdded.value
            )
            // assign assigned
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                assignAssigned.setting.id,
                assignAssigned.value
            )
            // test assigned
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                testAssigned.setting.id,
                testAssigned.value
            )
            // submit graded
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                submitGraded.setting.id,
                submitGraded.value
            )
            setSuccessMess(true)
            setTimeout(function () {
                setSuccessMess(false)
            }, 5000)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    return (
        <div className="noti-settings">
            <h4 className="noti-h4">{t('eno')}</h4>
            <div className="mt-4">
                {/* successMess message */}
                {successMess && (
                    <div
                        className="alert alert-success col-12 mb-0"
                        role="alert"
                    >
                        {t('msg44')}!
                    </div>
                )}
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>{t('remind')}</legend>
                    <input
                        id="studyReminder"
                        className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                        type="checkbox"
                        checked={isStudyReminder}
                        disabled={userInfo?.status === 'pending'}
                        onChange={(event) => {
                            setIsStudyReminder(event.target.checked)
                            if (event.target.checked) {
                                setStudyReminder({
                                    ...studyReminder,
                                    value: '07:00',
                                })
                            } else {
                                setStudyReminder({
                                    ...studyReminder,
                                    value: 'false',
                                })
                            }
                        }}
                    />
                    <label className="form-check-label" htmlFor="studyReminder">
                        {t('eremind')}
                    </label>
                    <div className="mt-2 notification_formTime">
                        <label
                            htmlFor="studyReminderTime"
                            className="form-label"
                        >
                            {t('timeDay')}:
                        </label>
                        <input
                            type="time"
                            className={`form-control ${FormStyles.formControl} ms-0`}
                            id="studyReminderTime"
                            value={studyReminder?.value || ''}
                            disabled={
                                !isStudyReminder ||
                                userInfo?.status === 'pending'
                            }
                            onChange={(event) => {
                                setStudyReminder({
                                    ...studyReminder,
                                    value: event.target.value,
                                })
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>{t('dueRemind')}</legend>
                    <div className="mb-3">
                        <input
                            id="assignmentReminder"
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={isAssignDueDate}
                            disabled={userInfo?.status === 'pending'}
                            onChange={(event) => {
                                setIsAssignDueDate(event.target.checked)
                                if (event.target.checked) {
                                    setAssignDueDate({
                                        ...assignDueDate,
                                        value: '24',
                                    })
                                } else {
                                    setAssignDueDate({
                                        ...assignDueDate,
                                        value: 'false',
                                    })
                                }
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="assignmentReminder"
                        >
                            {t('assRemind')}
                        </label>
                        <div className="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="remind-noti">
                                    <label
                                        htmlFor="assignDueDateReminderTime"
                                        className="form-label"
                                    >
                                        {t('before')}:
                                    </label>
                                </div>
                                <div className="remind-noti-col-10 notification_formTime">
                                    <input
                                        id="assignDueDateReminderTime"
                                        className={`form-control ${FormStyles.formControl} ms-0`}
                                        type="number"
                                        disabled={
                                            !isAssignDueDate ||
                                            userInfo?.status === 'pending'
                                        }
                                        value={assignDueDate?.value || ''}
                                        onChange={(event) => {
                                            setAssignDueDate({
                                                ...assignDueDate,
                                                value: event.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            id="testReminder"
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={isTestDueDate}
                            disabled={userInfo?.status === 'pending'}
                            onChange={(event) => {
                                setIsTestDueDate(event.target.checked)
                                if (event.target.checked) {
                                    setTestDueDate({
                                        ...testDueDate,
                                        value: '24',
                                    })
                                } else {
                                    setTestDueDate({
                                        ...testDueDate,
                                        value: 'false',
                                    })
                                }
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="testReminder"
                        >
                            {t('testR')}
                        </label>
                        <div className="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="remind-noti">
                                    <label
                                        htmlFor="testDueDateReminderTime"
                                        className="form-label"
                                    >
                                        {t('before')}:
                                    </label>
                                </div>
                                <div className="remind-noti-col-10 notification_formTime">
                                    <input
                                        type="number"
                                        className={`form-control ${FormStyles.formControl} ms-0`}
                                        id="testDueDateReminderTime"
                                        disabled={
                                            !isTestDueDate ||
                                            userInfo?.status === 'pending'
                                        }
                                        value={testDueDate?.value || ''}
                                        onChange={(event) => {
                                            setTestDueDate({
                                                ...testDueDate,
                                                value: event.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="form-check notification_formContainer mb-3 ps-0">
                    <legend>{t('msg45')}:</legend>
                    <div className="noti-input">
                        <input
                            id="setAdded"
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={setAdded?.value}
                            disabled={userInfo?.status === 'pending'}
                            onChange={(event) => {
                                setSetAdded({
                                    ...setAdded,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label className="form-check-label" htmlFor="setAdded">
                            {t('msg50')}
                        </label>
                    </div>
                    <div>
                        <input
                            id="postPosted"
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={postAdded?.value}
                            disabled={userInfo?.status === 'pending'}
                            onChange={(event) => {
                                setPostAdded({
                                    ...postAdded,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="postPosted"
                        >
                            {t('msg49')}
                        </label>
                    </div>
                    <div>
                        <input
                            id="assignmentAssigned"
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={assignAssigned?.value}
                            disabled={userInfo?.status === 'pending'}
                            onChange={(event) => {
                                setAssignAssigned({
                                    ...assignAssigned,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="assignmentAssigned"
                        >
                            {t('msg48')}
                        </label>
                    </div>
                    <div>
                        <input
                            id="testAssigned"
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={testAssigned?.value}
                            disabled={userInfo?.status === 'pending'}
                            onChange={(event) => {
                                setTestAssigned({
                                    ...testAssigned,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="testAssigned"
                        >
                            {t('msg47')}
                        </label>
                    </div>
                    <div>
                        <input
                            id="submissionGraded"
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={submitGraded?.value}
                            disabled={userInfo?.status === 'pending'}
                            onChange={(event) => {
                                setSubmitGraded({
                                    ...submitGraded,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="submissionGraded"
                        >
                            {t('msg46')}
                        </label>
                    </div>
                </fieldset>
                <button
                    className="btn btn-primary px-4 mt-4"
                    disabled={userInfo?.status === 'pending'}
                    onClick={handleSave}
                >
                    {t('save')}
                </button>
            </div>
        </div>
    )
}
export default Notifications
