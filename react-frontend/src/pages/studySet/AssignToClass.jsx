import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import ClassService from '../../services/ClassService'

import {
    AddIcon,
    CloseIcon,
    MinusIcon,
    SearchIcon,
} from '../../components/icons'
import Pagination from '../../components/Pagination'

const AssignToClass = ({
    showAssignModal,
    setShowAssignModal,
    studySet,
    userInfo,
}) => {
    const [assignClass, setAssignClass] = useState([])
    const [notAssignClass, setNotAssignClass] = useState([])
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')

    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState([])
    const [loading, setLoading] = useState(false)

    const [pageNot, setPageNot] = useState(1)
    const [totalItemsNot, setTotalItemsNot] = useState([])
    const [loadingNot, setLoadingNot] = useState(false)

    const [success, setSuccess] = useState(false)
    const [successMess, setSuccessMess] = useState('')

    const fetchAssign = async () => {
        setLoading(true)
        try {
            const tempAssignClass = (
                await ClassService.getFilterClassStudySet(
                    `=${studySet.id}`,
                    '',
                    `${search ? `=${search}` : ''}`,
                    `=${page}`,
                    '=5'
                )
            ).data
            setPage(1)
            setTotalItems(tempAssignClass.totalItems)
            setAssignClass(tempAssignClass.list)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const fetchNot = async () => {
        setLoadingNot(true)
        try {
            const tempNotAssignClass = (
                await ClassService.getFilterClassStudySet(
                    '',
                    `=${studySet.id}`,
                    `${search ? `=${search}` : ''}`,
                    `=${pageNot}`,
                    '=5'
                )
            ).data
            setPageNot(1)
            setTotalItemsNot(tempNotAssignClass.totalItems)
            setNotAssignClass(tempNotAssignClass.list)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingNot(false)
    }

    useEffect(() => {
        if (userInfo?.id && studySet?.id) {
            fetchAssign()
        }
    }, [userInfo, studySet, page, search])

    useEffect(() => {
        if (userInfo?.id && studySet?.id) {
            fetchNot()
        }
    }, [userInfo, studySet, pageNot, search])

    const handleAssign = (classroom, index) => {
        try {
            ClassService.addStudySetToClass(classroom.id, studySet.id)
            setAssignClass([...assignClass, classroom])
            var tempNot = [...notAssignClass]
            tempNot.splice(index, 1)
            setNotAssignClass([...tempNot])
            setSuccessMess(
                `Successfully assign ${studySet.title} to ${classroom.class_name}`
            )
            setSuccess(true)
            setTimeout(function () {
                setSuccess(false)
                setSuccessMess('')
            }, 3000)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleUnassign = (classroom, index) => {
        try {
            ClassService.unAssignStudySet(classroom.id, studySet.id)
            setNotAssignClass([...notAssignClass, classroom])
            var temp = [...assignClass]
            temp.splice(index, 1)
            setAssignClass([...temp])
            setSuccessMess(
                `Successfully unassign ${studySet.title} from ${classroom.class_name}`
            )
            setSuccess(true)
            setTimeout(function () {
                setSuccess(false)
                setSuccessMess('')
            }, 3000)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <Modal
            className="assignToClassModal mt-5"
            size="lg"
            show={showAssignModal}
            onHide={() => setShowAssignModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton className="border-0 pt-4 pb-3 ps-5 pe-4">
                <Modal.Title id="example-modal-sizes-title-lg">
                    Add to a class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-5">
                {studySet?._public ? (
                    <div>
                        {success && (
                            <div
                                className="alert alert-success col-12 mb-2"
                                role="alert"
                            >
                                {successMess}
                            </div>
                        )}
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
                        <Tabs
                            defaultActiveKey="assigned"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="assigned" title="Assigned">
                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : assignClass?.length > 0 ? (
                                    <div>
                                        {assignClass?.map(
                                            (classroom, index) => (
                                                <button
                                                    key={index}
                                                    className="assignClass_btn d-flex align-items-center justify-content-between"
                                                    onClick={() =>
                                                        handleUnassign(
                                                            classroom,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        {classroom?.class_name}
                                                    </span>
                                                    <MinusIcon
                                                        size="1.5rem"
                                                        strokeWidth="2"
                                                    />
                                                </button>
                                            )
                                        )}
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
                                ) : search ? (
                                    <div>No matching found.</div>
                                ) : assignClass.length > 0 ||
                                  notAssignClass.length > 0 ? (
                                    <div>
                                        This set has not been assigned to any
                                        class.
                                    </div>
                                ) : (
                                    <div>
                                        You don't have any class to unassign.
                                    </div>
                                )}
                            </Tab>
                            <Tab eventKey="notAssigned" title="Not assigned">
                                {loadingNot ? (
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : notAssignClass?.length > 0 ? (
                                    <div>
                                        {notAssignClass?.map(
                                            (classroom, index) => (
                                                <button
                                                    key={index}
                                                    className="assignClass_btn d-flex align-items-center justify-content-between"
                                                    onClick={() => {
                                                        handleAssign(
                                                            classroom,
                                                            index
                                                        )
                                                    }}
                                                >
                                                    <span>
                                                        {classroom?.class_name}
                                                    </span>
                                                    <AddIcon
                                                        size="1.5rem"
                                                        strokeWidth="2"
                                                    />
                                                </button>
                                            )
                                        )}
                                        {/* Pagination */}
                                        <Pagination
                                            className="mb-5"
                                            currentPage={pageNot}
                                            totalCount={totalItemsNot}
                                            pageSize={10}
                                            onPageChange={(page) => {
                                                setPageNot(page)
                                            }}
                                        />
                                    </div>
                                ) : search ? (
                                    <div>No matching found.</div>
                                ) : assignClass.length > 0 ||
                                  notAssignClass.length > 0 ? (
                                    <div>
                                        This set has been assigned to all your
                                        classes.
                                    </div>
                                ) : (
                                    <div>
                                        You don't have any class to assign.
                                    </div>
                                )}
                            </Tab>
                        </Tabs>
                    </div>
                ) : (
                    <div>
                        <h5>This is a private study set</h5>
                        <p>
                            Change this set to public so it's assignable to the
                            class.
                        </p>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    )
}
export default AssignToClass
