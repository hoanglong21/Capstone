import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import AssignmentService from '../../../services/AssignmentService'
import { deleteFolder } from '../../../features/fileManagement'

import '../../../assets/styles/popup.css'

const DeleteAssignment = ({
    assignments,
    assign,
    stateChanger,
    index,
    showDeleteModal,
    setShowDeleteModal,
}) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        // clear validation
        setLoading(true)
        try {
            await AssignmentService.deleteAssignment(assign.id)
            if (index) {
                var tempAssignments = [...assignments]
                tempAssignments.splice(index, 1)
                stateChanger(tempAssignments)
            }
            await deleteFolder(
                `files/${assign.classroom.user.username}/class/${assign.classroom.id}/assignment/${assign.id}`
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setShowDeleteModal(false)
        setLoading(false)
    }

    return (
        <Modal
            className="assignDeleteModal"
            show={showDeleteModal}
            onHide={() => {
                setShowDeleteModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete assignment?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Grades and comments will also be deleted</Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary me-3"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
                <button
                    className="btn btn-danger"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <div
                            className="spinner-border text-secondary mx-auto mb-1"
                            role="status"
                            id="loading"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Delete'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAssignment
