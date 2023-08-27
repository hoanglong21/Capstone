import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import UserService from '../../services/UserService'
import { useSelector } from 'react-redux'
import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/LibrarySearchList.css'
import Pagination from '../../components/Pagination'

function UsersForHome() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(1)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    const fetchData = async (searchKey) => {
        try {
            const temp = (
                await UserService.filterUserCommon(
                    '',
                    `${searchKey ? `=${searchKey}` : ''}`,
                    '',
                    '',
                    '=tutor,learner',
                    '',
                    '',
                    `=${page}`,
                    '=10'
                )
            ).data
            setTotalItems(temp.totalItems)
            setUsers(temp.list)
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

    useEffect(() => {
        if (loading === true && document.getElementById('searchHomeBtn')) {
            document.getElementById('searchHomeBtn').disabled = true
            document.getElementById(
                'searchHomeBtn'
            ).innerHTML = `<div class="d-flex justify-content-center">
                            <div class="spinner-border spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`
            document.getElementById('searchHomeInput').readOnly = true
        }
        if (loading === false && document.getElementById('searchHomeBtn')) {
            document.getElementById('searchHomeBtn').disabled = false
            document.getElementById('searchHomeBtn').innerHTML = 'Search'
            document.getElementById('searchHomeInput').readOnly = false
        }
    }, [loading])

    useEffect(() => {
        setLoading(true)
        fetchData(search ? search : '')
        setLoading(false)
    }, [search, page])

    return (
        <div className="mt-4 mb-5">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="sets-list mb-4 row g-3">
                        {users?.length === 0 && (
                            <p className="noFound">
                                {t('noUser')} {search} {t('found')}
                            </p>
                        )}
                        {users?.map((user) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={user?.id}
                            >
                                <div className="set-item h-100">
                                    <Link to={`/${user?.username}/sets`}>
                                        <div className="set-body">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={
                                                        user?.avatar
                                                            ? user?.avatar
                                                            : defaultAvatar
                                                    }
                                                    alt="author avatar"
                                                    className="UserAuthorAvatar"
                                                />
                                                <div className="d-flex flex-column justify-content-center ms-3">
                                                    <div className="d-flex align-items-center">
                                                        <span className="set-title">
                                                            {user?.username}
                                                        </span>
                                                        {user?.status ===
                                                            'banned' && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip id="tooltip">
                                                                        {t(
                                                                            'msg9'
                                                                        )}
                                                                        .
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <img
                                                                    className="ms-1 UserAuthorAvatarTag UserAuthorAvatarTag--banned"
                                                                    src={banned}
                                                                />
                                                            </OverlayTrigger>
                                                        )}
                                                        {user?.status ===
                                                            'active' && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip id="tooltip">
                                                                        {t(
                                                                            'msg8'
                                                                        )}
                                                                        .
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <img
                                                                    className="ms-1 UserAuthorAvatarTag"
                                                                    src={
                                                                        verified
                                                                    }
                                                                />
                                                            </OverlayTrigger>
                                                        )}
                                                        {user?.status ===
                                                            'deleted' && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip id="tooltip">
                                                                        {t(
                                                                            'msg7'
                                                                        )}
                                                                        .
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <img
                                                                    className="ms-1 UserAuthorAvatarTag"
                                                                    src={
                                                                        deleted
                                                                    }
                                                                />
                                                            </OverlayTrigger>
                                                        )}
                                                    </div>
                                                    <p
                                                        className="set-description m-0 mt-2"
                                                        style={{
                                                            whiteSpace:
                                                                'pre-wrap',
                                                        }}
                                                    >
                                                        {user?.role ===
                                                        'ROLE_ADMIN'
                                                            ? 'Admin'
                                                            : user?.role ===
                                                              'ROLE_TUTOR'
                                                            ? 'Tutor'
                                                            : 'Learner'}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                className="set-description m-0 mt-2"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {user?.bio}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    {users?.length > 0 && (
                        <Pagination
                            className="mb-5"
                            currentPage={page}
                            totalCount={totalItems}
                            pageSize={10}
                            onPageChange={(page) => {
                                setPage(page)
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default UsersForHome
