import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import StudySetService from '../../services/StudySetService'

import empty from '../../assets/images/empty-state.png'
import defaultAvatar from '../../assets/images/default_avatar.png'
import { SearchIcon } from '../../components/icons'
import '../../assets/styles/LibrarySearchList.css'

const StudySetList = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [sets, setSets] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    const fetchData = async (searchKey) => {
        const temp = (
            await StudySetService.getFilterList(
                '',
                '',
                '',
                `${searchKey ? '=' + searchKey : ''}`,
                `=${userInfo.username}`,
                '',
                '',
                '',
                '',
                ''
            )
        ).data.list
        setSets(temp)
    }

    const checkEmpty = async () => {
        const temp = (
            await StudySetService.getFilterList(
                '',
                '',
                '',
                '',
                `=${userInfo.username}`,
                '',
                '',
                '',
                '',
                ''
            )
        ).data.list
        if (temp.length === 0) {
            setIsEmpty(true)
        }
    }

    useEffect(() => {
        if (userInfo.username) {
            checkEmpty()
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo.username) {
            fetchData(search ? search : '')
        }
    }, [userInfo, search])

    const handleViewSet = (studySet) => {
        if (studySet._draft) {
            navigate(`/edit-set/${studySet.id}`)
        } else {
            navigate(`/set/${studySet.id}`)
        }
    }

    return (
        <div className="container mt-4 mb-5">
            {isEmpty ? (
                <div className="setsEmpty d-flex flex-column align-items-center justify-content-center">
                    <img
                        src={empty}
                        alt="No sets found in your library"
                        className="w-50"
                    />
                    <h3>You have no sets yet</h3>
                    <p>Sets you create or study will be shown here</p>
                    <div>
                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="createSetBtn"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Create a set
                            </button>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="createSetBtn"
                            >
                                <li>
                                    <button
                                        className="dropdown-item m-0"
                                        onClick={() => {
                                            navigate('/create-set/type=1')
                                        }}
                                    >
                                        Vocabulary
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={navigate('/create-set/type=2')}
                                    >
                                        Kanji
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={navigate('/create-set/type=3')}
                                    >
                                        Grammar
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="sets-search mb-4 d-flex align-items-center">
                        <input
                            className="search-control flex-grow-1"
                            placeholder="Search your sets"
                            type="text"
                            value={search || ''}
                            onChange={(event) =>
                                setSearchParams({
                                    search: event.target.value,
                                })
                            }
                        ></input>
                        <SearchIcon />
                    </div>
                    <div className="sets-list">
                        {sets.length === 0 && (
                            <p>No sets matching {search} found</p>
                        )}
                        {sets.map((set) => (
                            <div key={set.id} className="set-item mb-3">
                                <div
                                    onClick={() => handleViewSet(set)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="set-body row mb-2">
                                        <div className="term-count col-2">
                                            {set.count} terms
                                        </div>
                                        <div
                                            className="set-author col d-flex align-items-center"
                                            href="#"
                                        >
                                            <div className="author-avatar">
                                                <img
                                                    src={
                                                        userInfo.avatar
                                                            ? userInfo.avatar
                                                            : defaultAvatar
                                                    }
                                                    alt="author avatar"
                                                    className="w-100 h-100"
                                                />
                                            </div>
                                            <span className="author-username ms-2">
                                                {userInfo.username}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="set-title col-2">
                                            {set._draft
                                                ? `(Draft) ${set.title}`
                                                : set.title}
                                        </div>
                                        <div className="col d-flex align-items-center">
                                            <p
                                                className="set-description m-0"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {set.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default StudySetList
