import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import { useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useEffect } from 'react'

import StudySetService from '../../services/StudySetService'
import { logout } from '../../features/auth/authSlice'
import { getUser } from '../../features/user/userAction'

import logo from '../../assets/images/logo-2.png'
import avatar from '../../assets/images/avatar-default.jpg'
import {
    HomeIcon,
    TranslateIcon,
    AddIcon,
    NotifyIcon,
    ProfileIcon,
    SettingIcon,
    HelpIcon,
    LogoutIcon,
    DictIcon,
    LibraryIcon,
} from '../icons'
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
    }, [userToken, dispatch])

    const toggleShowLogoutMess = () => setShowLogoutMess(!showLogoutMess)

    const handleLogout = () => {
        dispatch(logout())
        toggleShowLogoutMess()
        navigate('/')
    }

    const handleAddStudySet = async () => {
        if (userToken) {
            const studySet = (
                await StudySetService.createStudySet({
                    user: {
                        id: userInfo.id,
                    },
                    title: '',
                    description: '',
                    deleted: false,
                    public: true,
                    studySetType: {
                        id: 1,
                    },
                    deleted_date: '',
                })
            ).data
            navigate('create-set/' + studySet.id)
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
                            to="search"
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
                    <li>
                        <NavLink
                            to="sets"
                            className={
                                'nav-link px-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <LibraryIcon className="mx-2" />
                            <span className="align-middle">Your Library</span>
                        </NavLink>
                    </li>
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
                            <AddIcon className="icon-primary" size="3.5rem" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                                <button
                                    className="dropdown-item py-2 px-2"
                                    type="button"
                                    onClick={handleAddStudySet}
                                >
                                    <span className="align-middle fw-semibold">
                                        Study Set
                                    </span>
                                </button>
                            </li>
                            {userInfo?.role !== 'ROLE_LEARNER' && (
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-2"
                                        type="button"
                                    >
                                        <span className="align-middle fw-semibold">
                                            Class
                                        </span>
                                    </button>
                                </li>
                            )}
                            <li>
                                <Link
                                    className="dropdown-item py-2 px-2"
                                    type="button"
                                    to="joinclass"
                                >
                                    <span className="align-middle fw-semibold">
                                        Join Class
                                    </span>
                                </Link>
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
                                        src={avatar}
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-2">
                                    <li>
                                        <div className="dropdown-header d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={avatar}
                                                    alt="avatar"
                                                    className="avatar"
                                                />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <p className="fw-semibold">
                                                    TuyetNTA
                                                </p>
                                                <p
                                                    className="text-truncate"
                                                    style={{
                                                        maxWidth: '8rem',
                                                    }}
                                                >
                                                    tuyetnta@gmail.com
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
        </header>
    )
}
export default Header
