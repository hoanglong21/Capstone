import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import { useState, useEffect } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'

import { logout as authLogout } from '../../features/auth/authSlice'
import { logout as userLogout } from '../../features/user/userSlice'
import { getUser } from '../../features/user/userAction'
import NotificationService from '../../services/NotificationService'

import CreateClass from '../../pages/class/CreateClass'
import JoinClass from '../../pages/class/JoinClass'

import logo from '../../assets/images/logo-2.png'
import defaultAvatar from '../../assets/images/default_avatar.png'
import noNotify from '../../assets/images/no-notification.png'
import {
    HomeIcon,
    TranslateIcon,
    AddCircleIcon,
    NotifyIcon,
    HelpIcon,
    LogoutIcon,
    DictIcon,
    LibraryIcon,
    SettingIcon,
    AchievementIcon,
} from '../icons'
import './Header.css'
import AuthService from '../../services/AuthService'
import { getNumUnread } from '../../features/notify/notifyAction'
import Pagination from '../Pagination'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)
    const { numUnread } = useSelector((state) => state.notify)

    const [showLogoutMess, setShowLogoutMess] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showJoinModal, setShowJoinModal] = useState(false)

    const [isEmpty, setIsEmpty] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [page, setPage] = useState(1)
    const [isRead, setIsRead] = useState(false)

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return new String(date?.replace(/\s/g, 'T') + '.000' + '+07:00')
        }
        return ''
    }

    useEffect(() => {
        if (userToken) {
            dispatch(getUser(userToken))
        }
    }, [userToken])

    // check notification empty
    useEffect(() => {
        const fetchData = async () => {
            const tempNotifications = (
                await NotificationService.getFilterNotification(
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${userInfo.id}`,
                    '',
                    '=1',
                    '=5'
                )
            ).data
            if (tempNotifications.totalItems === 0) {
                setIsEmpty(true)
            }
            setPage(1)
            setTotalItems(tempNotifications.totalItems)
            setNotifications(tempNotifications.list)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo, numUnread])

    // notifications
    useEffect(() => {
        const fetchData = async () => {
            const tempNotifications = (
                await NotificationService.getFilterNotification(
                    '',
                    `${isRead === false ? '' : '=0'}`,
                    '',
                    '',
                    '',
                    `=${userInfo.id}`,
                    '',
                    `=${page}`,
                    '=5'
                )
            ).data
            setIsEmpty(false)
            setTotalItems(tempNotifications.totalItems)
            setNotifications(tempNotifications.list)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [page, isRead])

    const toggleShowLogoutMess = () => setShowLogoutMess(!showLogoutMess)

    const handleLogout = () => {
        try {
            dispatch(userLogout())
            dispatch(authLogout())
            AuthService.logout()
            toggleShowLogoutMess()
            navigate('/')
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleAddStudySet = async (type) => {
        if (userToken) {
            navigate(`create-set?type=${type}`)
        } else {
            navigate('login')
        }
    }

    const handleAddClass = () => {
        if (userToken) {
            setShowCreateModal(true)
        } else {
            navigate('/login')
        }
    }

    const handleJoinClass = () => {
        if (userToken) {
            setShowJoinModal(true)
        } else {
            navigate('/login')
        }
    }

    const handleRead = async (notify) => {
        try {
            var tempNotify = { ...notify, _read: true }
            tempNotify.datetime = toBEDate(tempNotify.datetime)
            if (tempNotify?.user) {
                tempNotify.user.created_date = toBEDate(
                    tempNotify.user.created_date
                )
            }
            await NotificationService.updateNotification(notify.id, tempNotify)
            dispatch(getNumUnread(userInfo.id))
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleMarkAllRead = async (event) => {
        try {
            event.stopPropagation()
            await NotificationService.markAsRead(userInfo.id)
            dispatch(getNumUnread(userInfo.id))
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <header className="header-css border-bottom">
            <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start navbar navbar-expand-sm">
                <a
                    href="/"
                    className="navbar-brand d-flex align-items-center mb-2 mb-lg-0 me-2 text-white text-decoration-none"
                >
                    <img
                        className="header_img bi"
                        src={logo}
                        alt="logo"
                        width="60rem"
                    />
                </a>
                <button
                    className="navbar-toggler header_navbar"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    <span className="navbar-toggler-icon fs-7"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav d-flex align-items-center flex-grow-1 me-3 mb-2 mb-md-0 fw-semibold">
                        <li className="nav-item">
                            <NavLink
                                to={'.'}
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <HomeIcon className="mx-2" />
                                <span className="align-middle">Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="vocab"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <DictIcon className="mx-2" />
                                <span className="align-middle">Dictionary</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="translate"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <TranslateIcon className="mx-2" />
                                <span className="align-middle">Translate</span>
                            </NavLink>
                        </li>
                        {userToken ? (
                            <li className="nav-item">
                                <NavLink
                                    to="/library/sets"
                                    className={
                                        'nav-link px-3 ' +
                                        (({ isActive }) =>
                                            isActive ? 'active' : '')
                                    }
                                >
                                    <LibraryIcon className="mx-2" />
                                    <span className="align-middle">
                                        Your Library
                                    </span>
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink
                                    to="/discovery"
                                    className={
                                        'nav-link px-3 ' +
                                        (({ isActive }) =>
                                            isActive ? 'active' : '')
                                    }
                                >
                                    <LibraryIcon className="mx-2" />
                                    <span className="align-middle">
                                        Discovery
                                    </span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="landing-header">
                    {/* Add button */}
                    <div className="dropdown d-inline-flex">
                        <button
                            className="btn btn-avatar"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <AddCircleIcon
                                className="icon-primary"
                                size="3.5rem"
                            />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-2 header-dropdown">
                            <li>
                                <a
                                    className="dropdown-item py-2 px-2"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="true"
                                >
                                    <span className="align-middle fw-semibold">
                                        Study Set
                                    </span>
                                </a>
                                <ul
                                    className="submenu dropdown-menu dropdown-submenu dropdown-submenu-left header-dropdown"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleAddStudySet(1)}
                                        >
                                            Vocabulary
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleAddStudySet(2)}
                                        >
                                            Kanji
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleAddStudySet(3)}
                                        >
                                            Grammar
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            {(!userInfo ||
                                userInfo?.role !== 'ROLE_LEARNER') && (
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-2"
                                        type="button"
                                        onClick={handleAddClass}
                                    >
                                        <span className="align-middle fw-semibold">
                                            Class
                                        </span>
                                    </button>
                                </li>
                            )}
                            <li>
                                <button
                                    className="dropdown-item py-2 px-2"
                                    type="button"
                                    onClick={handleJoinClass}
                                >
                                    <span className="align-middle fw-semibold">
                                        Join Class
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    {userToken ? (
                        <div>
                            {/* Notify */}
                            <div
                                id="bell"
                                className="dropdown d-inline-flex me-2"
                            >
                                <button
                                    className="btn notify_btn btn-outline-secondary icon-outline-secondary position-relative"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <NotifyIcon strokeWidth="2" />
                                    {numUnread > 0 && (
                                        <span
                                            className="position-absolute translate-middle bg-danger border border-light rounded-circle"
                                            style={{
                                                top: '10%',
                                                left: '85%',
                                                padding: '0.375rem',
                                            }}
                                        >
                                            <span className="visually-hidden">
                                                New alerts
                                            </span>
                                        </span>
                                    )}
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end p-2 notifications"
                                    // style={{ minHeight: '82vh' }}
                                    id="box"
                                >
                                    {isEmpty ? (
                                        <li className="d-flex flex-column align-items-center">
                                            <img
                                                src={noNotify}
                                                className="notifyEmpty"
                                            />
                                            <span className="notifyFilter_heading mt-2">
                                                No Notifications Yet
                                            </span>
                                            <span className="notifyFilter_subtext mt-1">
                                                You have no notification right
                                                now
                                            </span>
                                            <span className="notifyFilter_subtext mt-1 mb-2">
                                                Come back later
                                            </span>
                                        </li>
                                    ) : (
                                        <>
                                            <li className="d-flex mb-2">
                                                <button
                                                    className={`notifyFilter_btn ${
                                                        isRead === false
                                                            ? 'active'
                                                            : ''
                                                    } me-1`}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        if (isRead === true) {
                                                            setIsRead(false)
                                                        }
                                                    }}
                                                >
                                                    All
                                                </button>
                                                <button
                                                    className={`notifyFilter_btn ${
                                                        isRead === true
                                                            ? 'active'
                                                            : ''
                                                    }`}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        if (isRead === false) {
                                                            setIsRead(true)
                                                        }
                                                    }}
                                                >
                                                    Unread
                                                </button>
                                            </li>
                                            <li className="d-flex align-items-center mb-1">
                                                <span className="notifyFilter_heading flex-fill">
                                                    Earlier
                                                </span>
                                                <a
                                                    className="notifyFilter_link"
                                                    onClick={handleMarkAllRead}
                                                >
                                                    Mark all as read
                                                </a>
                                            </li>
                                            {/* Pagination */}
                                            <Pagination
                                                className="mt-1 mb-1"
                                                small={true}
                                                currentPage={page}
                                                totalCount={totalItems}
                                                pageSize={5}
                                                onPageChange={(page) => {
                                                    setPage(page)
                                                }}
                                            />
                                            {notifications?.map(
                                                (notify, index) => (
                                                    <li
                                                        key={index}
                                                        className="notifications-item dropdown-item"
                                                        onClick={() => {
                                                            handleRead(
                                                                notify,
                                                                index
                                                            )
                                                            navigate(
                                                                `${notify?.url}`
                                                            )
                                                        }}
                                                    >
                                                        <div className="d-flex flex-column">
                                                            <div className="row mb-1">
                                                                <div className="col-11">
                                                                    <h4
                                                                        className={`${
                                                                            notify?._read ===
                                                                                true &&
                                                                            'notifications_read'
                                                                        }`}
                                                                    >
                                                                        {
                                                                            notify?.title
                                                                        }
                                                                    </h4>
                                                                </div>
                                                                <div className="col-1">
                                                                    {notify?._read ===
                                                                        false && (
                                                                        <span className="badge text-bg-primary p-1 rounded-circle">
                                                                            <span className="visually-hidden">
                                                                                New
                                                                                alerts
                                                                            </span>
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <span className="notify_content">
                                                                {
                                                                    notify?.content
                                                                }
                                                            </span>
                                                            <span className="notify_datetime">
                                                                {
                                                                    notify?.datetime
                                                                }
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </>
                                    )}
                                </ul>
                            </div>
                            {/* User */}
                            <div className="dropdown d-inline-flex">
                                <button
                                    className="btn btn-avatar pe-0"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={
                                            userInfo?.avatar
                                                ? userInfo?.avatar
                                                : defaultAvatar
                                        }
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-2">
                                    <li>
                                        <div className="dropdown-header d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        userInfo?.avatar
                                                            ? userInfo?.avatar
                                                            : defaultAvatar
                                                    }
                                                    alt="avatar"
                                                    className="avatar"
                                                />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <p className="fw-semibold">
                                                    {userInfo?.username}
                                                </p>
                                                <p
                                                    className="text-truncate"
                                                    style={{
                                                        maxWidth: '8rem',
                                                    }}
                                                >
                                                    {userInfo?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={() => {
                                                navigate(
                                                    '/library/achievements'
                                                )
                                            }}
                                        >
                                            <AchievementIcon
                                                className="me-3"
                                                strokeWidth="1.65"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Achievements
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={() => {
                                                navigate('/account')
                                            }}
                                        >
                                            <SettingIcon
                                                className="me-3"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Settings
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={() => {
                                                navigate('/help-center')
                                            }}
                                        >
                                            <HelpIcon
                                                className="me-3"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Help Center
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={handleLogout}
                                        >
                                            <LogoutIcon
                                                className="me-3"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Logout
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="landing-btn btn btn-light me-2"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="register">
                                <button
                                    type="button"
                                    className="landing-btn btn btn-warning"
                                >
                                    Sign up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            {/* Logout message */}
            <ToastContainer
                className="p-3 mt-5"
                position="top-end"
                style={{ zIndex: 9999 }}
            >
                <Toast
                    show={showLogoutMess}
                    onClose={toggleShowLogoutMess}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>You have been logged out</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* Create class modal */}
            <CreateClass
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />
            {/* Join class modal */}
            <JoinClass
                showJoinModal={showJoinModal}
                setShowJoinModal={setShowJoinModal}
            />
        </header>
    )
}
export default Header
