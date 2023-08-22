import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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

const People = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [learners, setLearners] = useState([])
    const [requests, setRequests] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [messToast, setMessToast] = useState('')

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
            tempRequest.created_date = toBEDate(tempRequest.created_date)
            tempRequest.user.created_date = toBEDate(
                tempRequest.user.created_date
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
                        <h2>Requests</h2>
                        <p>{requests?.length} request to join</p>
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
                                <span className="people_username">
                                    {request?.user?.username}
                                </span>
                                {request?.user?.status === 'banned' && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                This account is banned.
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
                                                This account is verified.
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
                                                This account is deleted.
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
                                    Accept
                                </button>
                                <span className="people_btnDivider"></span>
                                <button
                                    className="people_btn people_btn--decline"
                                    disabled={classroom?._deleted}
                                    onClick={() =>
                                        handleDecline(request, index)
                                    }
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="people_section">
                <div className="people_heading mb-3">
                    <h2>Tutor</h2>
                </div>
                <div className="ps-3 d-flex align-items-center">
                    <img
                        className="people_avatar"
                        src={classroom?.user?.avatar || defaultAvatar}
                    />
                    <span className="people_username">
                        {classroom?.user?.username}
                    </span>
                    {classroom?.user?.status === 'banned' && (
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip">
                                    This account is banned.
                                </Tooltip>
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
                                <Tooltip id="tooltip">
                                    This account is verified.
                                </Tooltip>
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
                                <Tooltip id="tooltip">
                                    This account is deleted.
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
            </div>
            <div className="mt-5 people_section">
                <div className="people_heading mb-3 d-flex justify-content-between">
                    <h2>Members</h2>
                    <p>{learners?.length} members</p>
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
                        <span className="people_username">
                            {learner?.user?.username}
                        </span>
                        {learner?.user?.status === 'banned' && (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="tooltip">
                                        This account is banned.
                                    </Tooltip>
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
                                    <Tooltip id="tooltip">
                                        This account is verified.
                                    </Tooltip>
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
                                    <Tooltip id="tooltip">
                                        This account is deleted.
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
