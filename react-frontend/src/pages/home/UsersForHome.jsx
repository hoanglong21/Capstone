import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import UserService from '../../services/UserService'

import defaultAvatar from '../../assets/images/default_avatar.png'
import '../../assets/styles/LibrarySearchList.css'

function UsersForHome() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const [users, setUsers] = useState([])

    const fetchData = async (searchKey) => {
        try {
            const temp = (
                await UserService.filterUser(
                    '',
                    `${searchKey ? '=' + searchKey : ''}`,
                    '',
                    '',
                    '',
                    '=tutor,learner',
                    '',
                    '',
                    '=active,pending',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    ''
                )
            ).data.list
            setUsers(temp)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

    return (
        <div className="mt-4 mb-5">
            <div className="sets-list row g-3">
                {users?.length === 0 && (
                    <p className="noFound">No users matching {search} found</p>
                )}
                {users?.map((user) => (
                    <div className="col-12 col-md-6 col-xl-4" key={user?.id}>
                        <div className="set-item h-100">
                            <Link to={``}>
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
            </div>
        </div>
    )
}

export default UsersForHome
