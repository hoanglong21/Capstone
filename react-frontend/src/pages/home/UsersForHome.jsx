import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import UserService from '../../services/UserService'

import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/LibrarySearchList.css'
import Pagination from '../../components/Pagination'

function UsersForHome() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')
    const author = searchParams.get('author')

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(1)

    const fetchData = async (searchKey) => {
        try {
            const temp = (
                await UserService.filterUserCommon(
                    '',
                    `${searchKey || author ? `=${searchKey || author}` : ''}`,
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
    }, [search, author, page])

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
                                No users matching {search} found
                            </p>
                        )}
                        {users?.map((user) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={user?.id}
                            >
                                <div className="set-item h-100">
                                    <Link
                                        to={{
                                            pathname: '/',
                                            search: `?author=${user?.username}`,
                                        }}
                                    >
                                        <div className="set-body">
                                            <div className="d-flex align-items-center">
                                                <div className="UserAuthorAvatarContainer">
                                                    <img
                                                        src={
                                                            user?.avatar
                                                                ? user?.avatar
                                                                : defaultAvatar
                                                        }
                                                        alt="author avatar"
                                                        className="UserAuthorAvatar"
                                                    />
                                                    {user?.status ===
                                                        'banned' && (
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="tooltip">
                                                                    This account
                                                                    is banned.
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <img
                                                                className="UserAuthorAvatarTag UserAuthorAvatarTag--banned"
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
                                                                    This account
                                                                    is verified.
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <img
                                                                className="UserAuthorAvatarTag"
                                                                src={verified}
                                                            />
                                                        </OverlayTrigger>
                                                    )}
                                                    {user?.status ===
                                                        'deleted' && (
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="tooltip">
                                                                    This account
                                                                    is deleted.
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <img
                                                                className="UserAuthorAvatarTag"
                                                                src={deleted}
                                                            />
                                                        </OverlayTrigger>
                                                    )}
                                                </div>
                                                <div className="d-flex flex-column justify-content-center ms-3">
                                                    <span className="set-title">
                                                        {user?.username}
                                                    </span>
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
