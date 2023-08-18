import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

import ClassService from '../../services/ClassService'
import StudySetService from '../../services/StudySetService'

import AssignSets from './AssignSets'

import { CloseIcon, SearchIcon } from '../../components/icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import Pagination from '../../components/Pagination'

const Sets = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [classroom, setClassroom] = useState({})
    const [sets, setSets] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    const [showAssignModal, setShowAssignModal] = useState(false)
    const [isAssign, setIsAssign] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMess, setToastMess] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // class
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                // sets
                const tempSets = (
                    await StudySetService.getFilterListByClass(
                        `=${tempClass?.user?.id}`,
                        `${search ? `=${search}` : ''}`,
                        `=${id}`,
                        '=1',
                        '',
                        '',
                        `=${page}`,
                        '=5'
                    )
                ).data
                if (tempSets.totalItems < 1) {
                    setIsEmpty(true)
                }
                setTotalItems(tempSets.totalItems)
                setSets(tempSets.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [id, userInfo])

    useEffect(() => {
        const fetchData = async () => {
            setIsEmpty(false)
            try {
                const tempSets = (
                    await StudySetService.getFilterListByClass(
                        `=${userInfo?.id}`,
                        `${search ? `=${search}` : ''}`,
                        `=${id}`,
                        '=1',
                        '',
                        '',
                        `=${page}`,
                        '=5'
                    )
                ).data
                setTotalItems(tempSets.totalItems)
                setSets(tempSets.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [search, page])

    useEffect(() => {
        const fetchData = async () => {
            setIsEmpty(false)
            try {
                const tempSets = (
                    await StudySetService.getFilterListByClass(
                        `=${userInfo?.id}`,
                        `${search ? `=${search}` : ''}`,
                        `=${id}`,
                        '=1',
                        '',
                        '',
                        `=${page}`,
                        '=5'
                    )
                ).data
                setTotalItems(tempSets.totalItems)
                setSets(tempSets.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (isAssign === true) {
            fetchData()
            setIsAssign(false)
        }
    }, [isAssign])

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {isEmpty ? (
                    <div className="class_setsEmpty text-center mt-5">
                        <h3>This class doesn't have any sets yet</h3>
                        {userInfo?.id === classroom?.user?.id && (
                            <div>
                                <p>
                                    Add an existing set or create a new one to
                                    share.
                                </p>
                                <button
                                    className="btn btn-info"
                                    onClick={() => {
                                        setShowAssignModal(true)
                                    }}
                                >
                                    Add a study set
                                </button>
                                {/* assign modal */}
                                <AssignSets
                                    showAssignModal={showAssignModal}
                                    setShowAssignModal={setShowAssignModal}
                                    classroom={classroom}
                                    userInfo={userInfo}
                                    setShowToast={setShowToast}
                                    setToastMess={setToastMess}
                                    isAssign={isAssign}
                                    setIsAssign={setIsAssign}
                                />
                                {/* assign toast */}
                                <ToastContainer
                                    className="p-3"
                                    position="top-end"
                                    style={{ zIndex: 1 }}
                                >
                                    <Toast
                                        onClose={() => setShowToast(false)}
                                        show={showToast}
                                        bg="dark"
                                        delay={3000}
                                        autohide
                                    >
                                        <Toast.Body className="text-white">
                                            {toastMess}
                                        </Toast.Body>
                                    </Toast>
                                </ToastContainer>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <form className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchInput || ''}
                                onChange={(event) => {
                                    setSearchInput(event.target.value)
                                }}
                            />
                            {searchInput && (
                                <button
                                    className="btn btn-outline-secondary px-2"
                                    type="button"
                                    onClick={() => {
                                        setSearch('')
                                        setSearchInput('')
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            )}
                            <button
                                className="btn btn-outline-secondary px-2"
                                type="submit"
                                onClick={(event) => {
                                    event.preventDefault()
                                    setSearch(searchInput)
                                }}
                            >
                                <SearchIcon />
                            </button>
                        </form>
                        {search ? (
                            <div>No matching found.</div>
                        ) : (
                            <div>
                                <div className="row">
                                    {sets.map((set) => (
                                        <div
                                            className="col-12 col-md-6 col-xl-4"
                                            key={set?.id}
                                        >
                                            <div
                                                key={set?.id}
                                                className="set-item h-100"
                                            >
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
                                                                whiteSpace:
                                                                    'pre-wrap',
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
                                                                        classroom
                                                                            ?.user
                                                                            ?.avatar
                                                                            ? classroom
                                                                                  ?.user
                                                                                  ?.avatar
                                                                            : defaultAvatar
                                                                    }
                                                                    alt="author avatar"
                                                                    className="w-100 h-100"
                                                                />
                                                            </div>
                                                            <span className="author-username ms-2">
                                                                {
                                                                    classroom
                                                                        ?.user
                                                                        ?.username
                                                                }
                                                            </span>
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
export default Sets
