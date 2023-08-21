import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import StudySetService from '../../services/StudySetService'

import Pagination from '../../components/Pagination'
import DeleteSet from '../studySet/DeleteSet'

import {
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
    CheckIcon,
    CloseIcon,
    DeleteSolidIcon,
    EditIcon,
    OptionVerIcon,
    SearchIcon,
} from '../../components/icons'
import empty from '../../assets/images/empty-state.png'
import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/LibrarySearchList.css'

const StudySetList = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [sets, setSets] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingSearch, setLoadingSearch] = useState(true)
    const [searchInput, setSearchInput] = useState(search)

    const [type, setType] = useState(-1)
    const [isDesc, setIsDesc] = useState(true)
    const [isPublic, setIsPublic] = useState(-1)
    const [isDraft, setIsDraft] = useState(false)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState([])

    const [deleteSet, setDeleteSet] = useState({})
    const [isDelete, setIsDelete] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const fetchData = async (searchKey) => {
        setLoadingSearch(true)
        try {
            setIsEmpty(false)
            const temp = (
                await StudySetService.getFilterList(
                    '=0',
                    `${isPublic == -1 ? '' : isPublic == 1 ? '=1' : '=0'}`,
                    `${isDraft ? '=1' : ''}`,
                    `${searchKey ? '=' + searchKey : ''}`,
                    `=${userInfo.username}`,
                    '',
                    `${type == -1 ? '' : `=${type}`}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${isDesc ? 'desc' : 'asc'}`,
                    `=${page}`,
                    `=10`
                )
            ).data
            setTotalItems(temp.totalItems)
            setSets(temp.list)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingSearch(false)
    }

    const checkEmpty = async () => {
        setLoading(true)
        try {
            setIsEmpty(false)
            const temp = (
                await StudySetService.getFilterList(
                    '=0',
                    '',
                    '',
                    '',
                    `=${userInfo.username}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '=1',
                    '=10'
                )
            ).data.list
            if (temp.length === 0) {
                setIsEmpty(true)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
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
    }, [userInfo, search, page, isDesc, isPublic, isDraft, type])

    useEffect(() => {
        if (isDelete === true) {
            setIsDelete(false)
            fetchData(search ? search : '')
        }
    }, [isDelete])

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border mt-5"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container mt-4 mb-5">
                {isEmpty ? (
                    <div className="setsEmpty d-flex flex-column align-items-center justify-content-center">
                        <img src={empty} alt="No sets found in your library" />
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
                                                navigate('/create-set?type=1')
                                            }}
                                        >
                                            Vocabulary
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() =>
                                                navigate('/create-set?type=2')
                                            }
                                        >
                                            Kanji
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() =>
                                                navigate('/create-set?type=3')
                                            }
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
                        <div className="row d-flex align-items-center mb-4">
                            <div className="studyset-col-5 d-flex align-items-center">
                                <select
                                    className="form-select sets-select py-2 me-2"
                                    aria-label="Default select example"
                                    value={isPublic || -1}
                                    onChange={(event) => {
                                        setIsPublic(event.target.value)
                                    }}
                                >
                                    <option value={-1}>All access</option>
                                    <option value={1}>Public</option>
                                    <option value={0}>Private</option>
                                </select>
                                <select
                                    className="form-select sets-select py-2 me-2"
                                    aria-label="Default select example"
                                    value={type || -1}
                                    onChange={(event) => {
                                        setType(event.target.value)
                                    }}
                                >
                                    <option value={-1}>All type</option>
                                    <option value={1}>Vocabulary</option>
                                    <option value={2}>Kanji</option>
                                    <option value={3}>Grammar</option>
                                </select>
                                <button
                                    className="btn btn-light p-2 me-2"
                                    onClick={() => {
                                        setIsDesc(!isDesc)
                                    }}
                                >
                                    {isDesc ? (
                                        <ArrowSmallDownIcon />
                                    ) : (
                                        <ArrowSmallUpIcon />
                                    )}
                                </button>
                                <button
                                    className="btn btn-light p-2 d-flex align-items-center"
                                    onClick={() => {
                                        setIsDraft(!isDraft)
                                    }}
                                >
                                    <span className="me-1">Only draft</span>
                                    {isDraft ? (
                                        <CheckIcon size="1.1rem" />
                                    ) : (
                                        <CloseIcon size="1.1rem" />
                                    )}
                                </button>
                            </div>
                            <div className="studyset-col-7">
                                <form className="sets-search d-flex align-items-center mb-0">
                                    <input
                                        className="search-control flex-grow-1"
                                        placeholder="Search your sets"
                                        type="text"
                                        value={searchInput || ''}
                                        readOnly={loading}
                                        onChange={(event) =>
                                            setSearchInput(event.target.value)
                                        }
                                    ></input>
                                    {searchInput && (
                                        <button
                                            className="btn btn-outline-secondary px-2"
                                            type="button"
                                            onClick={() => {
                                                setSearchInput('')
                                                if (search != '') {
                                                    setSearchParams({
                                                        search: '',
                                                    })
                                                }
                                            }}
                                        >
                                            <CloseIcon />
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        style={{
                                            border: 'none',
                                            backgroundColor: '#fff',
                                        }}
                                        disabled={loading}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setSearchParams({
                                                search: searchInput,
                                            })
                                        }}
                                    >
                                        <SearchIcon />
                                    </button>
                                </form>
                            </div>
                        </div>
                        {loadingSearch ? (
                            <div className="d-flex justify-content-center">
                                <div
                                    className="spinner-border mt-5"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="sets-list mb-4">
                                    {sets?.length === 0 ? (
                                        <p className="noFound">
                                            No sets matching {search} found
                                        </p>
                                    ) : (
                                        <div>
                                            {sets?.map((set) => (
                                                <div
                                                    key={set?.id}
                                                    className="set-item mb-3"
                                                >
                                                    <div className="row">
                                                        <div className="col-11">
                                                            <div
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    event.preventDefault()
                                                                    navigate(
                                                                        `/set/${set?.id}`
                                                                    )
                                                                }}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                <div className="set-body row mb-2">
                                                                    <div className="term-count col-3">
                                                                        {
                                                                            set?.count
                                                                        }{' '}
                                                                        terms
                                                                    </div>
                                                                    <div className="set-author col d-flex align-items-center">
                                                                        <div className="author-avatar">
                                                                            <img
                                                                                src={
                                                                                    userInfo?.avatar
                                                                                        ? userInfo?.avatar
                                                                                        : defaultAvatar
                                                                                }
                                                                                alt="author avatar"
                                                                                className="w-100 h-100"
                                                                            />
                                                                        </div>
                                                                        <span className="author-username ms-2">
                                                                            {
                                                                                userInfo?.username
                                                                            }
                                                                        </span>
                                                                        {set?.author_status ===
                                                                            'banned' && (
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="tooltip">
                                                                                        This
                                                                                        account
                                                                                        is
                                                                                        banned.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <img
                                                                                    className="ms-1 author-avatarTag author-avatarTag--banned"
                                                                                    src={
                                                                                        banned
                                                                                    }
                                                                                />
                                                                            </OverlayTrigger>
                                                                        )}
                                                                        {set?.author_status ===
                                                                            'active' && (
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="tooltip">
                                                                                        This
                                                                                        account
                                                                                        is
                                                                                        verified.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <img
                                                                                    className="ms-1 author-avatarTag"
                                                                                    src={
                                                                                        verified
                                                                                    }
                                                                                />
                                                                            </OverlayTrigger>
                                                                        )}
                                                                        {set?.author_status ===
                                                                            'deleted' && (
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="tooltip">
                                                                                        This
                                                                                        account
                                                                                        is
                                                                                        deleted.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <img
                                                                                    className="ms-1 author-avatarTag"
                                                                                    src={
                                                                                        deleted
                                                                                    }
                                                                                />
                                                                            </OverlayTrigger>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="set-title col-3">
                                                                        {set?._draft
                                                                            ? `(Draft) ${set?.title}`
                                                                            : set?.title}
                                                                    </div>
                                                                    <div className="col-9 d-flex align-items-center">
                                                                        <p
                                                                            className="set-description m-0"
                                                                            style={{
                                                                                whiteSpace:
                                                                                    'pre-wrap',
                                                                            }}
                                                                        >
                                                                            {
                                                                                set?.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-1">
                                                            <button
                                                                type="button dropdown-toggle"
                                                                className="btn btn-customLight"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                <OptionVerIcon />
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    <button
                                                                        className="setPageTerm_btn dropdown-item d-flex align-items-center"
                                                                        onClick={() => {
                                                                            navigate(
                                                                                `/edit-set/${set?.id}`
                                                                            )
                                                                        }}
                                                                    >
                                                                        <EditIcon
                                                                            size="20px"
                                                                            className="me-2"
                                                                        />
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="setPageTerm_btn dropdown-item d-flex align-items-center"
                                                                        onClick={() => {
                                                                            setDeleteSet(
                                                                                set
                                                                            )
                                                                            setShowDeleteModal(
                                                                                true
                                                                            )
                                                                        }}
                                                                    >
                                                                        <DeleteSolidIcon
                                                                            size="20px"
                                                                            className="me-2"
                                                                        />
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* delete set modal */}
                                            <DeleteSet
                                                studySet={deleteSet}
                                                showDeleteModal={
                                                    showDeleteModal
                                                }
                                                setShowDeleteModal={
                                                    setShowDeleteModal
                                                }
                                                isDelete={isDelete}
                                                setIsDelete={setIsDelete}
                                            />
                                        </div>
                                    )}
                                </div>
                                {/* Pagination */}
                                <Pagination
                                    className="mb-5"
                                    currentPage={page}
                                    totalCount={totalItems}
                                    pageSize={10}
                                    onPageChange={(page) => {
                                        setPage(page)
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}
export default StudySetList
