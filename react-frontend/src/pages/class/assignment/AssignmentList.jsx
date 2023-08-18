import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import AssignmentService from '../../../services/AssignmentService'
import ClassService from '../../../services/ClassService'

import DeleteAssignment from './DeleteAssignment'

import {
    AccountIcon,
    AddIcon,
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
    AssignmentIcon,
    CloseIcon,
    SearchIcon,
} from '../../../components/icons'
import tutorEmpty from '../../../assets/images/tutor_assign_empty.png'
import learnerEmpty from '../../../assets/images/learner_assign_empty.png'
import './assignment.css'
import SubmissionService from '../../../services/SubmissionService'
import Pagination from '../../../components/Pagination'

function AssignmentList() {
    const navigate = useNavigate()

    const { id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [assignments, setAssignments] = useState([])
    const [classroom, setClassroom] = useState({})
    const [loadingCount, setLoadingCount] = useState(false)
    const [loading, setLoading] = useState(true)
    const [today, setToday] = useState(new Date())

    const [isDelete, setIsDelete] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [isEmpty, setIsEmpty] = useState(false)
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [isDesc, setIsDesc] = useState(true)

    const [deleteAssign, setDeleteAssign] = useState({})

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate(), 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setIsEmpty(false)
            try {
                // class
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                // assignments
                const tempAssignments = (
                    await AssignmentService.getFilterList(
                        '',
                        '',
                        '',
                        `${
                            userInfo.id === tempClass.user.id
                                ? ''
                                : `=${getToday()}`
                        }`,
                        '',
                        '',
                        `${userInfo.id === tempClass.user.id ? '' : `=0`}`,
                        '',
                        '',
                        `=${tempClass.id}`,
                        '',
                        '=10'
                    )
                ).data
                if (tempAssignments.totalItems < 1) {
                    setIsEmpty(true)
                }
                setTotalItems(tempAssignments.totalItems)
                setAssignments(tempAssignments.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setIsEmpty(false)
            try {
                const tempAssignments = (
                    await AssignmentService.getFilterList(
                        `${search ? `=${search}` : ''}`,
                        '',
                        '',
                        `${
                            userInfo.id === classroom.user.id
                                ? ''
                                : `=${getToday()}`
                        }`,
                        '',
                        '',
                        `${userInfo.id === classroom.user.id ? '' : `=0`}`,
                        `=${isDesc ? 'desc' : 'asc'}`,
                        '',
                        `=${classroom.id}`,
                        `=${page}`,
                        '=10'
                    )
                ).data
                setTotalItems(tempAssignments.totalItems)
                setAssignments(tempAssignments.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (id && userInfo?.id && classroom?.id) {
            fetchData()
        }
    }, [page, search, isDesc])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setIsEmpty(false)
            try {
                const tempAssignments = (
                    await AssignmentService.getFilterList(
                        '',
                        '',
                        '',
                        `${
                            userInfo.id === classroom.user.id
                                ? ''
                                : `=${getToday()}`
                        }`,
                        '',
                        '',
                        `${userInfo.id === classroom.user.id ? '' : `=0`}`,
                        '',
                        '',
                        `=${classroom.id}`,
                        '',
                        '=10'
                    )
                ).data
                if (tempAssignments.totalItems < 1) {
                    setIsEmpty(true)
                }
                setTotalItems(tempAssignments.totalItems)
                setAssignments(tempAssignments.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (isDelete === true) {
            fetchData()
            setIsDelete(false)
        }
    }, [isDelete])

    const handleInfo = async (assign, index) => {
        try {
            // tutor
            if (userInfo?.id === classroom?.user?.id && !assign?.numSubmitted) {
                setLoadingCount(true)
                const tempCountSubmit = (
                    await AssignmentService.getNumSubmitAssignment(
                        assign.id,
                        assign.classroom.id
                    )
                ).data
                const numSubmitted = tempCountSubmit.submitted
                const numNotSubmitted = tempCountSubmit.notsubmitted
                var tempAssignments = [...assignments]
                tempAssignments[index] = {
                    ...assign,
                    numSubmitted,
                    numNotSubmitted,
                }
                setAssignments(tempAssignments)
                setLoadingCount(false)
            }
            // learner
            if (userInfo?.id !== classroom?.user?.id && !assign?.submission) {
                setLoadingCount(true)
                const tempSubmission = (
                    await SubmissionService.getSubmissionByAuthorIdandAssignmentId(
                        userInfo.id,
                        assign.id
                    )
                ).data
                var tempAssignments = [...assignments]
                tempAssignments[index] = {
                    ...assign,
                    submission: { ...tempSubmission },
                }
                setAssignments(tempAssignments)
                setLoadingCount(false)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

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
            <div>
                <div className="row d-flex align-items-center">
                    <div className="col-6">
                        {userInfo?.id === classroom?.user?.id && (
                            <div>
                                <button
                                    className="createAssign_btn"
                                    onClick={() => {
                                        navigate('../create-assignment')
                                    }}
                                >
                                    <AddIcon
                                        className="createAssignIcon_btn"
                                        size="1.125rem"
                                        strokeWidth="2.25"
                                    />
                                    Create
                                </button>
                            </div>
                        )}
                    </div>
                    {!isEmpty && (
                        <div className="col-6 d-flex">
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
                            <form className="input-group mb-0">
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
                        </div>
                    )}
                </div>
                {isEmpty ? (
                    <div>
                        {userInfo?.id === classroom?.user?.id ? (
                            <div className="emptyAssignments_container d-flex flex-column align-items-center justify-content-center">
                                <img src={tutorEmpty} alt="" />
                                <p className="mb-2 emptyAssignments_heading">
                                    This is where you’ll assign work
                                </p>
                                <p className="emptyAssignments_content">
                                    You can add assignments for the class, then
                                    organize it into topics
                                </p>
                            </div>
                        ) : (
                            <div className="emptyAssignments_container d-flex flex-column align-items-center justify-content-center">
                                <img src={learnerEmpty} alt="" />
                                <p className="emptyAssignments_heading">
                                    No assignments yet. Lucky you!
                                </p>
                            </div>
                        )}
                    </div>
                ) : search && assignments?.length === 0 ? (
                    <div className="mt-5">No matching found.</div>
                ) : (
                    <div>
                        <div
                            className="accordion my-4 accordionAssignments"
                            id="accordionAssignments"
                        >
                            {assignments.map((assign, index) => (
                                <div
                                    className="accordion-item"
                                    key={index}
                                    onClick={() => handleInfo(assign, index)}
                                >
                                    <button
                                        className="accordion-button collapsed d-flex justify-content-between align-items-center"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#assign${assign?.id}`}
                                        aria-expanded="false"
                                        aria-controls={`assign${assign?.id}`}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div
                                                className={`accordionAssign_icon ${
                                                    (assign._draft ||
                                                        (!assign._draft &&
                                                            new Date(
                                                                assign.start_date
                                                            ) >= new Date())) &&
                                                    'disabled'
                                                }`}
                                            >
                                                <AssignmentIcon
                                                    size="24px"
                                                    strokeWidth="1.75"
                                                />
                                            </div>
                                            <div>{assign.title || '...'}</div>
                                        </div>
                                        <div>
                                            {assign._draft
                                                ? 'Draft'
                                                : assign?.start_date &&
                                                  new Date(assign?.start_date) >
                                                      today
                                                ? `Scheduled for ${assign?.start_date}`
                                                : assign?.due_date
                                                ? `Due ${assign?.due_date}`
                                                : 'No due date'}
                                        </div>
                                    </button>
                                    <div
                                        id={`assign${assign?.id}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionAssignments"
                                    >
                                        <div className="accordion-body">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    Posted{' '}
                                                    {assign?.created_date}
                                                </div>
                                                {userInfo?.id !==
                                                    classroom?.user?.id && (
                                                    <div>
                                                        {assign?.submission
                                                            ?.mark ? (
                                                            <div className="assignGraded">
                                                                Graded
                                                            </div>
                                                        ) : assign?.submission
                                                              ?._done ? (
                                                            <div className="assignSubmitted">
                                                                Submitted
                                                            </div>
                                                        ) : new Date(
                                                              assign?.due_date
                                                          ) > today ? (
                                                            <div className="assignMissing">
                                                                Missing
                                                            </div>
                                                        ) : (
                                                            'Not submitted'
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-3 d-flex justify-content-between">
                                                <button
                                                    className="viewAssign_btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `../assignment/${assign.id}/details`
                                                        )
                                                    }
                                                >
                                                    View details
                                                </button>
                                                {userInfo?.id ===
                                                    assign?.user?.id && (
                                                    <div className="d-flex">
                                                        <div className="asignInfo_block">
                                                            <div className="assignInfo_number">
                                                                {loadingCount &&
                                                                    '...'}
                                                                {
                                                                    assign?.numSubmitted
                                                                }
                                                            </div>
                                                            <div className="assignInfo_title">
                                                                Submitted
                                                            </div>
                                                        </div>
                                                        <div className="asignInfo_block">
                                                            <div className="assignInfo_number">
                                                                {loadingCount &&
                                                                    '...'}
                                                                {
                                                                    assign?.numNotSubmitted
                                                                }
                                                            </div>
                                                            <div className="assignInfo_title">
                                                                Not Submitted
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {userInfo?.id ===
                                                assign?.user?.id && (
                                                <div className="mt-5 d-flex justify-content-between">
                                                    <button
                                                        className="editAssign_btn"
                                                        onClick={() => {
                                                            navigate(
                                                                `../edit-assignment/${assign?.id}`
                                                            )
                                                        }}
                                                    >
                                                        Edit assignment
                                                    </button>
                                                    <button
                                                        className="deleteAssign_btn"
                                                        type="button"
                                                        onClick={() => {
                                                            setDeleteAssign(
                                                                assign
                                                            )
                                                            setShowDeleteModal(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        Delete assignment
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
                        {/* delete modal */}
                        <DeleteAssignment
                            isDelete={isDelete}
                            setIsDelete={setIsDelete}
                            assign={deleteAssign}
                            showDeleteModal={showDeleteModal}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default AssignmentList
