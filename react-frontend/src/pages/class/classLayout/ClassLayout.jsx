import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'

import ClassService from '../../../services/ClassService'
import ClassLearnerService from '../../../services/ClassLearnerService'

import UpdateClass from '../UpdateClass'
import DeleteClass from '../DeleteClass'

import {
    ClassIcon,
    DeleteIcon,
    EditIcon,
    OptionHorIcon,
    ReportIcon,
    StudySetIcon,
    UnenrollIcon,
} from '../../../components/icons'
import defaultAvatar from '../../../assets/images/default_avatar.png'
import './classLayout.css'

const ClassLayout = () => {
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [hasAccess, setHasAccess] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)
    const [loadingUnenroll, setLoadingUnenroll] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                const tempHasAccess = (
                    await ClassService.checkUserClass(id, userInfo.id)
                ).data
                setHasAccess(tempHasAccess)
                if (!tempHasAccess) {
                    const tempIsWaiting = (
                        await ClassService.checkUserClassWaiting(
                            id,
                            userInfo.id
                        )
                    ).data
                    setIsWaiting(tempIsWaiting)
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo, id])

    const handleRequest = async () => {
        try {
            await ClassLearnerService.createClassLeaner({
                user: { id: userInfo.id, username: userInfo.username },
                classroom: {
                    id: classroom.id,
                },
                status: 'pending',
            })
            setIsWaiting(true)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleCancelRequest = async () => {
        try {
            await ClassLearnerService.deleteClassLearner(
                userInfo.id,
                classroom.id
            )
            setIsWaiting(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleUnenroll = async () => {
        setLoadingUnenroll(true)
        try {
            // await ClassLearnerService.deleteClassLearner(deleteClass.id)
            document.getElementById('closeUnenrollClassModal').click()
            navigate('/')
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingUnenroll(false)
    }

    return (
        <div>
            <div className="mainClass_container mx-auto">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="d-flex align-items-center">
                            <ClassIcon
                                size="3.125rem"
                                className="mainClassHeader_icon"
                                strokeWidth="2"
                            />
                            <h1 className="mainClass_title m-0 ms-3">
                                {classroom.class_name}
                            </h1>
                        </div>
                        {!hasAccess && (
                            <p className="mt-1">{classroom.description}</p>
                        )}
                    </div>
                    {hasAccess ? (
                        <div className="dropdown align-self-start">
                            <button
                                className="btn btn-outline-secondary icon-outline-secondary "
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <OptionHorIcon />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3 d-flex align-items-center"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#updateClassModal"
                                    >
                                        <EditIcon
                                            className="me-3"
                                            size="1.3rem"
                                        />
                                        <span className="align-middle fw-semibold">
                                            Edit
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3 d-flex align-items-center"
                                        type="button"
                                    >
                                        <ReportIcon
                                            className="me-3"
                                            size="1.3rem"
                                            strokeWidth="2"
                                        />
                                        <span className="align-middle fw-semibold">
                                            Report
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                {userInfo?.id === classroom?.user?.id ? (
                                    <li>
                                        <button
                                            className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteClassModal"
                                        >
                                            <DeleteIcon
                                                className="me-3"
                                                size="1.3rem"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Delete
                                            </span>
                                        </button>
                                    </li>
                                ) : (
                                    <li>
                                        <button
                                            className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#unenrollClassModal"
                                        >
                                            <UnenrollIcon
                                                className="me-3"
                                                size="1.3rem"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Unenroll
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            {isWaiting ? (
                                <button
                                    className="btn btn-outline-primary rounded"
                                    type="button"
                                    onClick={handleCancelRequest}
                                >
                                    Cancel Request
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-primary rounded"
                                    type="button"
                                    onClick={handleRequest}
                                >
                                    Request to join class
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {hasAccess ? (
                    <div>
                        <div className="mainClass_navbar mt-4">
                            <ul className="nav">
                                <li>
                                    <NavLink
                                        to=""
                                        end
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Stream
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="assignments"
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Assignments
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="tests"
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Tests
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="people"
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            People
                                        </span>
                                    </NavLink>
                                </li>
                                {userInfo?.id === classroom?.user?.id && (
                                    <div className="d-flex">
                                        <li>
                                            <NavLink
                                                to="grades"
                                                className={
                                                    'mainClass_navlink ' +
                                                    (({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : '')
                                                }
                                            >
                                                <span className="align-middle">
                                                    Grades
                                                </span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="statistics"
                                                className={
                                                    'mainClass_navlink ' +
                                                    (({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : '')
                                                }
                                            >
                                                <span className="align-middle">
                                                    Statistics
                                                </span>
                                            </NavLink>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <div className="row mt-5">
                        {isWaiting ? (
                            <div className="col-8 text-center">
                                <h3 className="mainClass_infoTitle">
                                    Your request to join this class has been
                                    sent
                                </h3>
                                <p>
                                    Once a class owner approves, you'll start
                                    receiving class announcements
                                </p>
                            </div>
                        ) : (
                            <div className="col-8 text-center">
                                <h3 className="mainClass_infoTitle">
                                    Join this class to get access to its content
                                </h3>
                            </div>
                        )}
                        <div className="col-4">
                            <h6 className="mainClass_infoLabel">
                                CLASS DETAILS
                            </h6>
                            <div className="d-flex align-items-center mt-2">
                                <img
                                    src={
                                        classroom?.user?.avatar || defaultAvatar
                                    }
                                    className="mainClass_authorAvatar"
                                />
                                <div className="ms-3">
                                    {classroom?.user?.username}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                                <StudySetIcon size="20px" />
                                <div className="ms-3">
                                    {classroom?.studySets?.length} sets
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Update class Modal */}
            <UpdateClass classroom={classroom} stateChanger={setClassroom} />
            {/* Delete class modal */}
            <DeleteClass classroom={classroom} />
            {/* Unenroll class modal */}
            <div
                className="modal fade classDeleteModal"
                tabIndex="-1"
                id="unenrollClassModal"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title classModalTitle">
                                Delete this class?
                            </h5>
                            <button
                                id="closeUnenrollClassModal"
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="classModalHeading mb-4">
                                {classroom.class_name}
                            </div>
                            <p>You are about to unenroll this class.</p>
                            <p className="fw-semibold">
                                Are you sure? This cannot be undone.
                            </p>
                            <div className="text-end mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary classModalBtn me-3"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-danger classModalBtn"
                                    onClick={handleUnenroll}
                                    disabled={loadingUnenroll}
                                >
                                    {loadingUnenroll ? (
                                        <div
                                            className="spinner-border text-secondary mx-auto mb-1"
                                            role="status"
                                            id="loadingUnenroll"
                                        >
                                            <span className="visually-hidden">
                                                LoadingUnenroll...
                                            </span>
                                        </div>
                                    ) : (
                                        'Yes, unenroll from this class.'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassLayout
