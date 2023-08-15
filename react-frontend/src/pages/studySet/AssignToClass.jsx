import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'

import ClassService from '../../services/ClassService'
import { AddIcon } from '../../components/icons'

const AssignToClass = ({
    showAssignModal,
    setShowAssignModal,
    userInfo,
}) => {
    const [classes, setClasses] = useState([])
    const [page, setPage] = useState([])
    const [totalItems, setTotalItems] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const temp = (
                await ClassService.getFilterList(
                    '',
                    '=0',
                    '',
                    `=${userInfo?.username}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${page}`,
                    '=10'
                )
            ).data
            setTotalItems(temp.totalItems)
            setClasses(temp.list)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

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
            <Modal.Body className="px-4">
                {classes?.length > 0 ? (
                    <div>
                        {classes?.map((classroom, index) => (
                            <button
                                key={index}
                                className="assignClass_btn d-flex align-items-center justify-content-between"
                            >
                                <span>{classroom?.class_name}</span>
                                <AddIcon size="1.5rem" strokeWidth="2" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}
            </Modal.Body>
        </Modal>
    )
}
export default AssignToClass
