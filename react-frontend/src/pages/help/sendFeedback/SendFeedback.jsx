import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import FeedbackTypeService from '../../../services/FeedbackTypeService'
import FeedbackService from '../../../services/FeedbackService'

import FormStyles from '../../../assets/styles/Form.module.css'
import './SendFeedback.css'

const SendFeedback = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.user)

    const [types, setTypes] = useState([])
    const [feedback, setFeedback] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTypes((await FeedbackTypeService.getAll()).data)
                setFeedback({
                    user: {
                        id: userInfo.id,
                    },
                    title: '',
                    feedbackType: {
                        id: '1',
                    },
                    destination: 'system',
                    content: '',
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
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        var form = document.getElementById('sendFeedbackForm')
        const titleEl = document.getElementById('title')
        const contentEl = document.getElementById('content')
        // clear validation
        form.classList.remove('was-validated')
        titleEl.classList.remove('is-invalid')
        contentEl.classList.remove('is-invalid')
        setError('')

        form.classList.add('was-validated')
        if (!feedback.title || !feedback.content) {
            if (!feedback.title) {
                titleEl.classList.add('is-invalid')
            }
            if (!feedback.content) {
                contentEl.classList.add('is-invalid')
            }
        } else {
            try {
                await FeedbackService.createFeedback(feedback)
                setSuccess(true)
                // clear validation
                form.classList.remove('was-validated')
                titleEl.classList.remove('is-invalid')
                contentEl.classList.remove('is-invalid')
                setError('')
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        setLoading(false)
    }

    return (
        <div className="feedbackContainer">
            <h1 className="feedback_heading">{t('contact')}</h1>
            <h4 className="feedback_message">{t('msg120')}!</h4>
            <form
                id="sendFeedbackForm"
                className="needs-validation mt-4 mx-auto formFeedback"
                noValidate
            >
                {/* error message */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {/* success */}
                {success && (
                    <div className="alert alert-primary" role="alert">
                        {t('msg115')}!
                    </div>
                )}
                <div className="formFeedbackBody row mx-3">
                    {/* feedback type */}
                    <div className="col-xs-12 mb-3">
                        <div className="form-floating">
                            <select
                                className={`form-select ${FormStyles.formSelect}`}
                                id="feedbackType"
                                aria-label="feedback type"
                                value={feedback.feedbackType?.id || 1}
                                onChange={(event) => {
                                    setFeedback({
                                        ...feedback,
                                        feedbackType: {
                                            id: event.target.value,
                                        },
                                    })
                                }}
                                required
                            >
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="feedbackType">{t('msg116')}</label>
                        </div>
                    </div>
                    {/* title */}
                    <div className="col-xs-12 mb-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={`form-control ${FormStyles.formControl}`}
                                id="title"
                                placeholder="title"
                                value={feedback.title || ''}
                                onChange={(event) => {
                                    setFeedback({
                                        ...feedback,
                                        title: event.target.value,
                                    })
                                }}
                                required
                            />
                            <label htmlFor="title">{t('title')}</label>
                            <div className="invalid-feedback text-start">
                                {t('msg118')}.
                            </div>
                        </div>
                    </div>
                    {/* content */}
                    <div className="col-xs-12">
                        <div className="form-floating">
                            <textarea
                                id="content"
                                className={`form-control ${FormStyles.formControl}`}
                                placeholder="content"
                                style={{ height: '6rem' }}
                                value={feedback.content || ''}
                                onChange={(event) => {
                                    setFeedback({
                                        ...feedback,
                                        content: event.target.value,
                                    })
                                }}
                                required
                            ></textarea>
                            <label htmlFor="content">{t('content')}</label>
                            <div className="invalid-feedback text-start">
                                {t('msg118')}.
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 mt-4 text-end">
                        <button
                            className="btn-lrg send-submit-btn"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <div
                                    className="spinner-border text-secondary mx-auto mb-1"
                                    role="status"
                                    id="loading"
                                >
                                    <span className="visually-hidden">
                                        {t('loading')}...
                                    </span>
                                </div>
                            ) : (
                                'Send Feedback'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SendFeedback
