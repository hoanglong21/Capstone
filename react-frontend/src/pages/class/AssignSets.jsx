import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import ClassService from '../../services/ClassService'
import StudySetService from '../../services/StudySetService'

import {
    AddIcon,
    CloseIcon,
    MinusIcon,
    SearchIcon,
} from '../../components/icons'
import Pagination from '../../components/Pagination'

const AssignSets = ({
    showAssignModal,
    setShowAssignModal,
    classroom,
    userInfo,
    setShowToast,
    setToastMess,
}) => {
    const [assignSets, setAssignSets] = useState([])
    const [notAssignSets, setNotAssignSets] = useState([])
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')

    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState([])
    const [loading, setLoading] = useState(false)

    const [pageNot, setPageNot] = useState(1)
    const [totalItemsNot, setTotalItemsNot] = useState([])
    const [loadingNot, setLoadingNot] = useState(false)

    const fetchAssign = async () => {
        setLoading(true)
        try {
            const tempAssignSets = (
                await StudySetService.getFilterListByClass(
                    `=${userInfo?.id}`,
                    `${search ? `=${search}` : ''}`,
                    `=${classroom.id}`,
                    '=1',
                    '',
                    '',
                    `=${page}`,
                    '=5'
                )
            ).data
            setPage(1)
            setTotalItems(tempAssignSets.totalItems)
            setAssignSets(tempAssignSets.list)
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
            const tempNotAssignSets = (
                await StudySetService.getFilterListByClass(
                    `=${userInfo?.id}`,
                    `${search ? `=${search}` : ''}`,
                    `=${classroom.id}`,
                    '=0',
                    '',
                    '',
                    `=${page}`,
                    '=5'
                )
            ).data
            setPageNot(1)
            setTotalItemsNot(tempNotAssignSets.totalItems)
            setNotAssignSets(tempNotAssignSets.list)
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
        if (userInfo?.id && classroom?.id) {
            fetchAssign()
        }
    }, [userInfo, classroom, page, search])

    useEffect(() => {
        if (userInfo?.id && classroom?.id) {
            fetchNot()
        }
    }, [userInfo, classroom, pageNot, search])

    const handleAssign = (studySet, index) => {
        try {
            ClassService.addStudySetToClass(classroom.id, studySet.id)
            setAssignSets([...assignSets, studySet])
            var tempNot = [...notAssignSets]
            tempNot.splice(index, 1)
            setNotAssignSets([...tempNot])
            setToastMess(
                `Successfully assign ${studySet.title} to ${classroom.class_name}`
            )
            setShowToast(true)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleUnassign = (studySet, index) => {
        try {
            ClassService.unAssignStudySet(classroom.id, studySet.id)
            setNotAssignSets([...notAssignSets, studySet])
            var temp = [...assignSets]
            temp.splice(index, 1)
            setAssignSets([...temp])
            setToastMess(
                `Successfully unassign ${studySet.title} from ${classroom.class_name}`
            )
            setShowToast(true)
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
            className="AssignSetsModal mt-5"
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
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : assignSets?.length > 0 ? (
                            <div>
                                {assignSets?.map((studySet, index) => (
                                    <button
                                        key={index}
                                        className="assignClass_btn d-flex align-items-center justify-content-between"
                                        onClick={() =>
                                            handleUnassign(studySet, index)
                                        }
                                    >
                                        <span>{studySet?.title}</span>
                                        <MinusIcon
                                            size="1.5rem"
                                            strokeWidth="2"
                                        />
                                    </button>
                                ))}
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
                        ) : assignSets.length > 0 ||
                          notAssignSets.length > 0 ? (
                            <div>This class doesn't have any sets yet</div>
                        ) : (
                            <div>
                                You don't have any study sets to assign to this
                                class.
                            </div>
                        )}
                    </Tab>
                    <Tab eventKey="notAssigned" title="Not assigned">
                        {loadingNot ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : notAssignSets?.length > 0 ? (
                            <div>
                                {notAssignSets?.map((studySet, index) => (
                                    <button
                                        key={index}
                                        className="assignClass_btn d-flex align-items-center justify-content-between"
                                        onClick={() => {
                                            handleAssign(studySet, index)
                                        }}
                                    >
                                        <span>{studySet?.title}</span>
                                        <AddIcon
                                            size="1.5rem"
                                            strokeWidth="2"
                                        />
                                    </button>
                                ))}
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
                        ) : assignSets.length > 0 ||
                          notAssignSets.length > 0 ? (
                            <div>
                                All of your study sets have been assigned to
                                this class.
                            </div>
                        ) : (
                            <div>
                                You don't have any study sets to assign to this
                                class.
                            </div>
                        )}
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}
export default AssignSets
