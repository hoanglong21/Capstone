import { NavLink, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/Home.css'
import UserService from '../../services/UserService'
import { ReportIcon } from '../../components/icons'
import Report from '../../components/report/Report'

const LibraryLayout = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { name } = useParams()
    const { userInfo } = useSelector((state) => state.user)

    const [user, setUser] = useState({})
    const [showReportModal, setShowReportModal] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (userInfo?.id || name != userInfo.username) {
                const tempUser = (await UserService.getUser(name)).data
                setUser(tempUser)
            }
        }
        fetchData()
    }, [name, userInfo])

    return (
        <div className="flex-grow-1">
            <div className="border-bottom bg-white p-2 pb-0">
                <div className="searchAuthor_container d-flex align-items-center justify-content-between my-2">
                    <div className="d-flex align-items-center">
                        <img
                            src={
                                user?.avatar ||
                                userInfo?.avatar ||
                                defaultAvatar
                            }
                            className="searchAuthor_avatar"
                        />
                        <div className="ms-3">
                            <div className="d-flex align-items-center">
                                <div className="searchAuthor_name">
                                    {user?.username || userInfo?.username}
                                </div>
                                {(user?.status == 'banned' ||
                                    userInfo?.status == 'banned') && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                This account is banned.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-2 searchAuthor_tag searchAuthor_tag--banned"
                                            src={banned}
                                        />
                                    </OverlayTrigger>
                                )}
                                {(user?.status == 'active' ||
                                    userInfo?.status == 'active') && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                This account is verified.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-2 searchAuthor_tag"
                                            src={verified}
                                        />
                                    </OverlayTrigger>
                                )}
                                {(user?.status == 'deleted' ||
                                    userInfo?.status == 'deleted') && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                This account is deleted.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-2 searchAuthor_tag"
                                            src={deleted}
                                        />
                                    </OverlayTrigger>
                                )}
                            </div>
                            {(user?.role == 'ROLE_TUTOR' ||
                                userInfo?.role == 'ROLE_TUTOR') && (
                                <div className="searchAuthor_role">Tutor</div>
                            )}
                        </div>
                    </div>
                    {name != userInfo?.username && (
                        <button
                            className="btn btn-outline-secondary icon-outline-secondary"
                            type="button"
                            onClick={() => {
                                setShowReportModal(true)
                            }}
                        >
                            <ReportIcon size="1.3rem" strokeWidth="2" />
                        </button>
                    )}
                </div>
                <ul className="nav-home nav flex-grow-1 fw-semibold">
                    <li>
                        <NavLink
                            to="achievements"
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Achievements</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'sets',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Study sets</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'classes',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Classes</span>
                        </NavLink>
                    </li>
                    {name == userInfo?.username && (
                        <li>
                            <NavLink
                                to={`statistics`}
                                className={
                                    'nav-link sub-nav-link px-3 me-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">Statistics</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
            <div className="library-layout p-2">
                <Outlet />
            </div>
            {/* report modal */}
            <Report
                showReportModal={showReportModal}
                setShowReportModal={setShowReportModal}
                userInfo={userInfo}
                destination={`user/${userInfo.id}`}
            />
        </div>
    )
}
export default LibraryLayout
