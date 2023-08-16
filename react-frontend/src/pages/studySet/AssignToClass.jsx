import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import ClassService from '../../services/ClassService'

import { AddIcon, MinusIcon } from '../../components/icons'

const AssignToClass = ({
    showAssignModal,
    setShowAssignModal,
    studySet,
    userInfo,
}) => {
    const [assignClass, setAssignClass] = useState([])
    const [notAssignClass, setNotAssignClass] = useState([])
    const [search, setSearch] = useState('')

    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState([])
    const [loading, setLoading] = useState(false)

    const [pageNot, setPageNot] = useState(1)
    const [totalItemsNot, setTotalItemsNot] = useState([])
    const [loadingNot, setLoadingNot] = useState(false)

    const fetchAssign = async () => {
        setLoading(true)
        try {
            const tempAssignClass = (
                await ClassService.getFilterClassStudySet(
                    `=${studySet.id}`,
                    '',
                    '',
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
                    '',
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
    }, [userInfo, studySet, page])

    useEffect(() => {
        if (userInfo?.id && studySet?.id) {
            fetchNot()
        }
    }, [userInfo, studySet, pageNot])

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
                        ) : assignClass?.length > 0 ? (
                            <div>
                                {assignClass?.map((classroom, index) => (
                                    <button
                                        key={index}
                                        className="assignClass_btn d-flex align-items-center justify-content-between"
                                    >
                                        <span>{classroom?.class_name}</span>
                                        <MinusIcon
                                            size="1.5rem"
                                            strokeWidth="2"
                                        />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div>
                                This set has not been assigned to any class.
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
                        ) : notAssignClass?.length > 0 ? (
                            <div>
                                {notAssignClass?.map((classroom, index) => (
                                    <button
                                        key={index}
                                        className="assignClass_btn d-flex align-items-center justify-content-between"
                                    >
                                        <span>{classroom?.class_name}</span>
                                        <AddIcon
                                            size="1.5rem"
                                            strokeWidth="2"
                                        />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div>
                                This set has been assigned to all your classes.
                            </div>
                        )}
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}
export default AssignToClass
