import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import { useState, useEffect } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'

import { logout } from '../../features/auth/authSlice'
import { getUser } from '../../features/user/userAction'

import CreateClass from '../../pages/class/CreateClass'
import JoinClass from '../../pages/class/JoinClass'

import logo from '../../assets/images/logo-2.png'
import {
    HomeIcon,
    TranslateIcon,
    AddCircleIcon,
    NotifyIcon,
    ProfileIcon,
    SettingIcon,
    HelpIcon,
    LogoutIcon,
    DictIcon,
    LibraryIcon,
} from '../icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import './Header.css'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [showLogoutMess, setShowLogoutMess] = useState(false)

    useEffect(() => {
        if (userToken) {
            dispatch(getUser(userToken))
        }
    }, [userToken])

    const toggleShowLogoutMess = () => setShowLogoutMess(!showLogoutMess)

    const handleLogout = () => {
        dispatch(logout())
        toggleShowLogoutMess()
        navigate('/')
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
            document.getElementById('toggleCreateModal').click()
        } else {
            navigate('/login')
        }
    }

    const handleJoinClass = () => {
        if (userToken) {
            document.getElementById('toggleJoinModal').click()
        } else {
            navigate('/login')
        }
    }

    return (
        <header className="px-4 border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a
                    href="/"
                    className="d-flex align-items-center mb-2 mb-lg-0 me-2 text-white text-decoration-none"
                >
                    <img
                        className="bi me-5"
                        src={logo}
                        alt="logo"
                        width="60rem"
                    />
                </a>

                <ul className="nav d-flex align-items-center flex-grow-1 me-3 mb-2 mb-md-0 fw-semibold">
                    <li>
                        <NavLink
                            to={'.'}
                            className={
                                'nav-link px-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <HomeIcon className="mx-2" />
                            <span className="align-middle">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="vocab"
                            className={
                                'nav-link px-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <DictIcon className="mx-2" />
                            <span className="align-middle">Dictionary</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="translate"
                            className={
                                'nav-link px-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <TranslateIcon className="mx-2" />
                            <span className="align-middle">Translate</span>
                        </NavLink>
                    </li>
                    {userToken ? (
                        <li>
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
                        <li>
                            <NavLink
                                to="/discovery"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <LibraryIcon className="mx-2" />
                                <span className="align-middle">Discovery</span>
                            </NavLink>
                        </li>
                    )}
                </ul>

                <div className="d-flex align-items-center">
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
                        <ul className="dropdown-menu dropdown-menu-end p-2">
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
                                    className="dropdown-menu dropdown-submenu dropdown-submenu-left"
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
                                userInfo.role !== 'ROLE_LEARNER') && (
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
                                    <button
                                        id="toggleCreateModal"
                                        className="d-none"
                                        data-bs-toggle="modal"
                                        data-bs-target="#createClassModal"
                                    ></button>
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
                                <button
                                    id="toggleJoinModal"
                                    className="d-none"
                                    data-bs-toggle="modal"
                                    data-bs-target="#joinClassModal"
                                ></button>
                            </li>
                        </ul>
                    </div>

                    {userToken ? (
                        <>
                            {/* Notify */}
                            <button
                                type="button"
                                className="btn btn-outline-secondary icon-outline-secondary me-2"
                            >
                                <NotifyIcon strokeWidth="2" />
                            </button>

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
                                            userInfo.avatar
                                                ? userInfo.avatar
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
                                                        userInfo.avatar
                                                            ? userInfo.avatar
                                                            : defaultAvatar
                                                    }
                                                    alt="avatar"
                                                    className="avatar"
                                                />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <p className="fw-semibold">
                                                    {userInfo.username}
                                                </p>
                                                <p
                                                    className="text-truncate"
                                                    style={{
                                                        maxWidth: '8rem',
                                                    }}
                                                >
                                                    {userInfo.email}
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
                                                navigate('account')
                                            }}
                                        >
                                            <ProfileIcon
                                                className="me-3"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Profile
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={() => {
                                                navigate('setting')
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
                                                navigate('help-center')
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
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="btn btn-light me-2"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="register">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                >
                                    Sign up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
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
            <CreateClass />
            {/* Join class modal */}
            <JoinClass />
        </header>
    )
}
export default Header
