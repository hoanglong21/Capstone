import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import ClassService from '../../services/ClassService'

import Pagination from '../../components/Pagination'

import {
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
    ClassIcon,
    SearchIcon,
} from '../../components/icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import '../../assets/styles/LibrarySearchList.css'
import '../../assets/styles/Home.css'

const ClassList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [classes, setClasses] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingSearch, setLoadingSearch] = useState(true)

    const [searchInput, setSearchInput] = useState(search)
    const [type, setType] = useState('all')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [isDesc, setIsDesc] = useState(true)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showJoinModal, setShowJoinModal] = useState(false)

    const fetchData = async (searchKey) => {
        setLoadingSearch(true)
        try {
            setIsEmpty(false)
            const temp = (
                await ClassService.getFilterList(
                    '',
                    '=0',
                    `${searchKey ? '=' + searchKey : ''}`,
                    `${type !== 'joined' ? `=${userInfo.username}` : ''}`,
                    `${type !== 'created' ? `=${userInfo.username}` : ''}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${isDesc ? 'desc' : 'asc'}`,
                    `=${page}`,
                    '=10'
                )
            ).data
            setTotalItems(temp.totalItems)
            setClasses(temp.list)
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
                await ClassService.getFilterList(
                    '',
                    '',
                    '',
                    `=${userInfo.username}`,
                    `=${userInfo.username}`,
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
        if (userInfo?.username) {
            fetchData(search ? search : '')
        }
    }, [userInfo, search, type, page, isDesc])

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
                        <img
                            src="https://www.gstatic.com/classroom/empty_states_home.svg"
                            alt="No classes found in your library"
                        />
                        <h3>You haven't created or joined any classes</h3>
                        <p>Your classes will be shown here</p>
                        <div>
                            <button
                                className="btn btn-outline-primary me-3"
                                type="button"
                                onClick={() => {
                                    setShowCreateModal(true)
                                }}
                            >
                                Create Class
                            </button>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => {
                                    setShowJoinModal(true)
                                }}
                            >
                                Join Class
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="row d-flex align-items-center mb-4">
                            <div className="col-5 d-flex align-items-center">
                                <select
                                    className="form-select sets-select py-2 me-2"
                                    aria-label="Default select example"
                                    value={type || 'all'}
                                    onChange={(event) => {
                                        setType(event.target.value)
                                    }}
                                >
                                    <option value="all">All</option>
                                    <option value="created">Created</option>
                                    <option value="joined">Joined</option>
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
                            </div>
                            <div className="col-7">
                                <form className="sets-search m-0 d-flex align-items-center">
                                    <input
                                        className="search-control flex-grow-1"
                                        placeholder="Search your classes"
                                        type="text"
                                        value={searchInput || ''}
                                        readOnly={loading}
                                        onChange={(event) =>
                                            setSearchInput(event.target.value)
                                        }
                                    ></input>
                                    <button
                                        type="submit"
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
                                    {classes?.length === 0 && (
                                        <p className="noFound">
                                            No classes matching {search} found
                                        </p>
                                    )}
                                    {classes?.map((classroom) => (
                                        <div key={classroom.id}>
                                            <div className="set-item mb-3">
                                                <Link
                                                    to={`/class/${classroom.id}`}
                                                >
                                                    <div className="set-body row mb-2">
                                                        <div className="class-home term-count">
                                                            {classroom?.member}{' '}
                                                            member
                                                        </div>
                                                        <div className="class-home term-count">
                                                            {
                                                                classroom?.studyset
                                                            }{' '}
                                                            sets
                                                        </div>
                                                        <div
                                                            className="set-author col d-flex "
                                                            href="#"
                                                        >
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
                                                                {
                                                                    classroom?.author
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="class-title set-title d-flex align-items-center">
                                                            <ClassIcon className="me-2" />
                                                            {
                                                                classroom?.class_name
                                                            }
                                                        </div>
                                                        <div className="col d-flex align-items-center">
                                                            <p
                                                                className="set-description m-0"
                                                                style={{
                                                                    whiteSpace:
                                                                        'pre-wrap',
                                                                }}
                                                            >
                                                                {
                                                                    classroom?.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
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
export default ClassList
