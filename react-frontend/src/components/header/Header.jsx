import './Header.css'
import logo from '../../assets/images/Quizlet-Logo.png'
import avatar from '../../assets/images/avatar-default.jpg'

import AuthService from '../../services/AuthService'

import {
    HomeIcon,
    SearchIcon,
    TranslateIcon,
    LibraryIcon,
    AddIcon,
    NotifyIcon,
    ProfileIcon,
    SettingIcon,
    HelpIcon,
    LogoutIcon,
    StudySetIcon,
    FolderIcon,
    ClassIcon,
} from '../icons'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../state/authSlice'

const Header = () => {
    const isLogged = useSelector((state) => state.auth.isLogged)
    const dispatch = useDispatch()

    return (
        <header className="p-2 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a
                        href="/"
                        className="d-flex align-items-center mb-2 mb-lg-0 me-auto text-white text-decoration-none"
                    >
                        <img
                            className="bi me-5"
                            src={logo}
                            alt="logo"
                            height="32"
                        />
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 fw-semibold">
                        <li>
                            <NavLink
                                to="."
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <HomeIcon className="mx-1" />
                                <span className="align-middle">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="search"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <SearchIcon className="mx-1" />
                                <span className="align-middle">Search</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="translate"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <TranslateIcon className="mx-1" />
                                <span className="align-middle">Translate</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="library"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <LibraryIcon className="mx-1" />
                                <span className="align-middle">
                                    Your Library
                                </span>
                            </NavLink>
                        </li>
                    </ul>

                    <div>
                        {/* Add button */}
                        <div className="dropdown d-inline-flex">
                            <button
                                className="btn btn-avatar"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <AddIcon
                                    className="icon-primary"
                                    size="3.5rem"
                                />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-2">
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3"
                                        type="button"
                                    >
                                        <StudySetIcon
                                            className="me-3"
                                            strokeWidth="2"
                                        />
                                        <span className="align-middle fw-semibold">
                                            Study Set
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3"
                                        type="button"
                                    >
                                        <FolderIcon
                                            className="me-3"
                                            strokeWidth="2"
                                        />
                                        <span className="align-middle fw-semibold">
                                            Folder
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3"
                                        type="button"
                                    >
                                        <ClassIcon
                                            className="me-3"
                                            strokeWidth="2"
                                        />
                                        <span className="align-middle fw-semibold">
                                            Class
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {isLogged ? (
                            <>
                                {/* Notify */}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary icon-outline-secondary me-2"
                                >
                                    <NotifyIcon strokeWidth="2" />
                                </button>

                                {/* User */}
                                <div className="dropdown me-2 d-inline-flex">
                                    <button
                                        className="btn btn-avatar"
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
                                                <div class="flex-shrink-0">
                                                    <img
                                                        src={avatar}
                                                        alt="avatar"
                                                        className="avatar"
                                                    />
                                                </div>
                                                <div class="flex-grow-1 ms-3">
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
                                            <hr class="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item py-2 px-3"
                                                type="button"
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
                                            <hr class="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item py-2 px-3"
                                                type="button"
                                                onClick={() => {
                                                    AuthService.logout()
                                                    dispatch(logout())
                                                }}
                                            >
                                                <LogoutIcon
                                                    className="me-3"
                                                    strokeWidth="2"
                                                    onClick={() => {
                                                        AuthService.logout()
                                                        dispatch(logout())
                                                    }}
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
                                        Sign-up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header
