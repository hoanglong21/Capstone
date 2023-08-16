import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import StudySetService from '../../services/StudySetService'
import ClassService from '../../services/ClassService'
import UserService from '../../services/UserService'

import defaultAvatar from '../../assets/images/default_avatar.png'
import { ClassIcon } from '../../components/icons'

function AllForHome() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')
    const author = searchParams.get('author')

    const [sets, setSets] = useState([])
    const [classes, setClasses] = useState([])
    const [users, setUsers] = useState([])

    const [loading, setLoading] = useState(true)
    const [loadingSets, setLoadingSets] = useState(true)
    const [loadingClasses, setLoadingClasses] = useState(true)
    const [loadingUsers, setLoadingUsers] = useState(true)

    const fetchSetsData = async (searchKey) => {
        setLoadingSets(true)
        try {
            const tempSets = (
                await StudySetService.getFilterList(
                    '=0',
                    '=1',
                    '=0',
                    `${!author && searchKey ? '=' + searchKey : ''}`,
                    `${author ? `=${author}` : ''}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '=1',
                    '=3'
                )
            ).data.list
            setSets(tempSets)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingSets(false)
    }

    const fetchClassesData = async (searchKey) => {
        setLoadingClasses(true)
        try {
            const temp = (
                await ClassService.getFilterList(
                    '',
                    '=0',
                    `${!author && searchKey ? '=' + searchKey : ''}`,
                    `${author ? `=${author}` : ''}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '=1',
                    '=2'
                )
            ).data.list
            setClasses(temp)
            setLoadingClasses(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const fetchUsersData = async (searchKey) => {
        setLoadingUsers(true)
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
                    '=1',
                    '=3'
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
        setLoadingUsers(false)
    }

    useEffect(() => {
        setLoading(true)
        fetchSetsData(search ? search : '')
        fetchClassesData(search ? search : '')
        fetchUsersData(search ? search : '')
        setLoading(false)
    }, [search, author])

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

    return (
        <div className="mt-4 mb-5">
            {/* Sets */}
            <div className="mb-5">
                <div className="d-flex justify-content-between mb-3">
                    <h4 className="sets-heading">Study sets</h4>
                    <Link
                        to={{
                            pathname: '/sets',
                            search: `?${searchParams.toString()}`,
                        }}
                        className="sets-link link-primary"
                    >
                        View all
                    </Link>
                </div>
                {loadingSets ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="sets-list row g-3">
                        {sets.length === 0 && (
                            <p className="noFound">
                                No sets matching {search} found
                            </p>
                        )}
                        {sets.map((set) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={set?.id}
                            >
                                <div key={set?.id} className="set-item h-100">
                                    <Link to={`/set/${set?.id}`}>
                                        <div className="set-body">
                                            <div className="set-title mb-2">
                                                {set?._draft
                                                    ? `(Draft) ${set?.title}`
                                                    : set?.title}
                                            </div>
                                            <div className="term-count mb-2">
                                                {set?.count} terms
                                            </div>
                                            <p
                                                className="set-description m-0 mb-2"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {set?.description}
                                            </p>
                                            <div
                                                className="set-author d-flex align-items-center"
                                                href="#"
                                            >
                                                <div className="author-avatar">
                                                    <img
                                                        src={
                                                            set?.avatar
                                                                ? set?.avatar
                                                                : defaultAvatar
                                                        }
                                                        alt="author avatar"
                                                        className="w-100 h-100"
                                                    />
                                                </div>
                                                <span className="author-username ms-2">
                                                    {set?.author}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Classes */}
            <div className="mb-5">
                <div className="d-flex justify-content-between mb-3">
                    <h4 className="sets-heading">Classes</h4>
                    <Link
                        to={{
                            pathname: '/classes',
                            search: `?${searchParams.toString()}`,
                        }}
                        className="sets-link link-primary"
                    >
                        View all
                    </Link>
                </div>
                {loadingClasses ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="sets-list row g-3">
                        {classes?.length === 0 && (
                            <p className="noFound">
                                No classes matching {search} found
                            </p>
                        )}
                        {classes?.map((classroom) => (
                            <div
                                className="col-12 col-lg-6"
                                key={classroom?.id}
                            >
                                <div
                                    key={classroom?.id}
                                    className="set-item h-100"
                                >
                                    <Link to={`/class/${classroom?.id}`}>
                                        <div className="set-body">
                                            <div className="set-title mb-2 d-flex align-items-center">
                                                <ClassIcon className="me-2" />
                                                {classroom?.class_name}
                                            </div>
                                            <p
                                                className="set-description m-0 mb-2"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {classroom?.description}
                                            </p>
                                            <div className="set-author mb-2 d-flex align-items-center">
                                                <div className="author-avatar">
                                                    <img
                                                        src={
                                                            classroom?.avatar
                                                                ? classroom?.avatar
                                                                : defaultAvatar
                                                        }
                                                        alt="author avatar"
                                                        className="w-100 h-100"
                                                    />
                                                </div>
                                                <span className="author-username ms-2">
                                                    {classroom?.author}
                                                </span>
                                            </div>
                                            <div className="term-count">
                                                {classroom?.member} member
                                            </div>
                                            <div className="term-count">
                                                {classroom?.studyset} sets
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Users */}
            <div className="mb-5">
                <div className="d-flex justify-content-between mb-3">
                    <h4 className="sets-heading">Users</h4>
                    <Link
                        to={{
                            pathname: '/users',
                            search: `?${searchParams.toString()}`,
                        }}
                        className="sets-link link-primary"
                    >
                        View all
                    </Link>
                </div>
                {loadingUsers ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="sets-list row g-3">
                        {users.length === 0 && (
                            <p className="noFound">
                                No users matching {search} found
                            </p>
                        )}
                        {users.map((user) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={user?.id}
                            >
                                <div className="set-item h-100">
                                    <Link
                                        to={{
                                            pathname: '',
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
                )}
            </div>
        </div>
    )
}

export default AllForHome
