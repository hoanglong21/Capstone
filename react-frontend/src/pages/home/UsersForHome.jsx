import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import UserService from '../../services/UserService'

import defaultAvatar from '../../assets/images/default_avatar.png'
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
                await UserService.filterUser(
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
                <div className="sets-list row g-3">
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
                                            <div
                                                className="author-avatar"
                                                style={{
                                                    height: '4rem',
                                                    width: '4rem',
                                                }}
                                            >
                                                <img
                                                    src={
                                                        user?.avatar
                                                            ? user?.avatar
                                                            : defaultAvatar
                                                    }
                                                    alt="author avatar"
                                                    className="w-100 h-100"
                                                />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center ms-3">
                                                <span className="set-title">
                                                    {user?.username}
                                                </span>
                                                <p
                                                    className="set-description m-0 mt-2"
                                                    style={{
                                                        whiteSpace: 'pre-wrap',
                                                    }}
                                                >
                                                    {user?.role === 'ROLE_ADMIN'
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
