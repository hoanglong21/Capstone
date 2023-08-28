import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import ClassService from '../../services/ClassService'
import ClassLearnerService from '../../services/ClassLearnerService'

import defaultAvatar from '../../assets/images/default_avatar.png'
import NotificationService from '../../services/NotificationService'

import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import HistoryService from '../../services/HistoryService'
import { useTranslation } from 'react-i18next'

const People = () => {
    const navigate = useNavigate()
    
    const { userInfo } = useSelector((state) => state.user)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [learners, setLearners] = useState([])
    const [requests, setRequests] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [messToast, setMessToast] = useState('')

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // class
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                // member
                const tempLearners = (
                    await ClassLearnerService.filterClassLeaner(
                        '',
                        `=${id}`,
                        '',
                        '',
                        `=enrolled`,
                        '',
                        '',
                        '',
                        ''
                    )
                ).data.list
                setLearners(tempLearners)
                // requests
                const tempRequests = (
                    await ClassLearnerService.filterClassLeaner(
                        '',
                        `=${id}`,
                        '',
                        '',
                        `=pending`,
                        '',
                        '',
                        '',
                        ''
                    )
                ).data.list
                setRequests(tempRequests)
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

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    const handleAccept = async (request, index) => {
        try {
            var tempRequest = { ...request, status: 'enrolled' }
            tempRequest.classroom.created_date = toBEDate(
                tempRequest.classroom.created_date
            )
            tempRequest.classroom.user.created_date = toBEDate(
                tempRequest.classroom.user.created_date
            )
            tempRequest.classroom.user.dob = toBEDate(
                tempRequest.classroom.user.dob
            )
            tempRequest.classroom.user.deleted_date = toBEDate(
                tempRequest.classroom.user.deleted_date
            )
            tempRequest.classroom.user.banned_date = toBEDate(
                tempRequest.classroom.user.banned_date
            )
            tempRequest.created_date = toBEDate(tempRequest.created_date)
            tempRequest.user.created_date = toBEDate(
                tempRequest.user.created_date
            )
            tempRequest.user.dob = toBEDate(
                tempRequest.user.dob
            )
            tempRequest.user.deleted_date = toBEDate(
                tempRequest.user.deleted_date
            )
            tempRequest.user.banned_date = toBEDate(
                tempRequest.user.banned_date
            )
            await ClassLearnerService.updateClassLeaner(
                { ...tempRequest },
                request.id
            )
            // set requests
            var tempRequests = [...requests]
            tempRequests.splice(index, 1)
            setRequests(tempRequests)
            // set learners
            var tempLearners = [...learners, { ...tempRequest }]
            setLearners(tempLearners)
            // send notification
            NotificationService.createNotification({
                title: 'Request to join class',
                content: `Your request to join class ${classroom.class_name} have been accepted`,
                user: {
                    id: request.user.id,
                    username: request.user.username,
                },
                url: `/class/${classroom.id}`,
            })
            setMessToast(`${request.user.username} is now a member`)
            setShowToast(true)
            HistoryService.createHistory({
                historyType: { id: 8 },
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                },
                classroom: { id: id },
            })
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleDecline = async (request, index) => {
        try {
            // delete request
            await ClassLearnerService.deleteClassLearnerById(request.id)
            var tempRequests = [...requests]
            tempRequests.splice(index, 1)
            setRequests(tempRequests)
            // send notification
            NotificationService.createNotification({
                title: 'Request to join class',
                content: `Your request to join class ${classroom.class_name} have been rejected`,
                user: {
                    id: request.user.id,
                    username: request.user.username,
                },
                url: `/class/${classroom.id}`,
            })
            setMessToast(`${request.user.username} rejected`)
            setShowToast(true)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <div>
            {requests.length > 0 && (
                <div className="people_section mb-5">
                    <div className="people_heading mb-3 d-flex justify-content-between">
                        <h2>{t('request')}</h2>
                        <p>
                            {requests?.length} {t('reJoin')}
                        </p>
                    </div>
                    {requests?.map((request, index) => (
                        <div
                            className="ps-3 mb-2 d-flex align-items-center justify-content-between"
                            key={index}
                        >
                            <div className="d-flex align-items-center">
                                <img
                                    className="people_avatar"
                                    src={request?.user?.avatar || defaultAvatar}
                                />
                                <Link
                                    to={`/${request?.user?.username}/sets`}
                                    className="people_username"
                                >
                                    {request?.user?.username}
                                </Link>
                                {request?.user?.status === 'banned' && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                {t('msg9')}.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-1 author-avatarTag author-avatarTag--banned"
                                            src={banned}
                                        />
                                    </OverlayTrigger>
                                )}
                                {request?.user?.status === 'active' && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                {t('msg8')}.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-1 author-avatarTag"
                                            src={verified}
                                        />
                                    </OverlayTrigger>
                                )}
                                {request?.user?.status === 'deleted' && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                {t('msg7')}.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-1 author-avatarTag"
                                            src={deleted}
                                        />
                                    </OverlayTrigger>
                                )}
                            </div>
                            <div>
                                <button
                                    className="people_btn people_btn--accept"
                                    disabled={classroom?._deleted}
                                    onClick={() => handleAccept(request, index)}
                                >
                                    {t('accept')}
                                </button>
                                <span className="people_btnDivider"></span>
                                <button
                                    className="people_btn people_btn--decline"
                                    disabled={classroom?._deleted}
                                    onClick={() =>
                                        handleDecline(request, index)
                                    }
                                >
                                    {t('decline')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="people_section">
                <div className="people_heading mb-3">
                    <h2>{t('tutor')}</h2>
                </div>
                <div className="ps-3 d-flex align-items-center">
                    <img
                        className="people_avatar"
                        src={classroom?.user?.avatar || defaultAvatar}
                    />
                    <Link
                        to={`/${classroom?.user?.username}/sets`}
                        className="people_username"
                    >
                        {classroom?.user?.username}
                    </Link>
                    {classroom?.user?.status === 'banned' && (
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip">{t('msg9')}.</Tooltip>
                            }
                        >
                            <img
                                className="ms-1 author-avatarTag author-avatarTag--banned"
                                src={banned}
                            />
                        </OverlayTrigger>
                    )}
                    {classroom?.user?.status === 'active' && (
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip">{t('msg8')}.</Tooltip>
                            }
                        >
                            <img
                                className="ms-1 author-avatarTag"
                                src={verified}
                            />
                        </OverlayTrigger>
                    )}
                    {classroom?.user?.status === 'deleted' && (
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip">{t('msg7')}.</Tooltip>
                            }
                        >
                            <img
                                className="ms-1 author-avatarTag"
                                src={deleted}
                            />
                        </OverlayTrigger>
                    )}
                </div>
            </div>
            <div className="mt-5 people_section">
                <div className="people_heading mb-3 d-flex justify-content-between">
                    <h2>{t('member')}</h2>
                    <p>
                        {learners?.length} {t('member')}
                    </p>
                </div>
                {learners?.map((learner, index) => (
                    <div
                        className="ps-3 mb-3 d-flex align-items-center"
                        key={index}
                    >
                        <img
                            className="people_avatar"
                            src={learner?.user?.avatar || defaultAvatar}
                        />
                        <Link
                            to={`/${learner?.user?.username}/sets`}
                            className="people_username"
                        >
                            {learner?.user?.username}
                        </Link>
                        {learner?.user?.status === 'banned' && (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="tooltip">{t('msg9')}.</Tooltip>
                                }
                            >
                                <img
                                    className="ms-1 author-avatarTag author-avatarTag--banned"
                                    src={banned}
                                />
                            </OverlayTrigger>
                        )}
                        {learner?.user?.status === 'active' && (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="tooltip">{t('msg8')}.</Tooltip>
                                }
                            >
                                <img
                                    className="ms-1 author-avatarTag"
                                    src={verified}
                                />
                            </OverlayTrigger>
                        )}
                        {learner?.user?.status === 'deleted' && (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="tooltip">{t('msg7')}.</Tooltip>
                                }
                            >
                                <img
                                    className="ms-1 author-avatarTag"
                                    src={deleted}
                                />
                            </OverlayTrigger>
                        )}
                    </div>
                ))}
            </div>
            <ToastContainer
                className="p-3"
                position="bottom-start"
                style={{ zIndex: 1 }}
            >
                <Toast
                    bg="dark"
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                >
                    <Toast.Body className="text-white">{messToast}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
export default People
