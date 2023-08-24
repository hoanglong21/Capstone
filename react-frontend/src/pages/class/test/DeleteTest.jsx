import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useLocation, useNavigate } from 'react-router-dom'

import { deleteFolder } from '../../../features/fileManagement'
import TestService from '../../../services/TestService'

const DeleteTest = ({
    isDelete,
    setIsDelete,
    test,
    classroom,
    showDeleteModal,
    setShowDeleteModal,
}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        // clear validation
        setLoading(true)
        try {
            await TestService.deleteTest(test.id)
            if (isDelete === false) {
                setIsDelete(true)
            }
            setShowDeleteModal(false)
            if (location.pathname.includes(`/test/${test?.id}/details`)) {
                navigate(`/class/${classroom.id}/tests`)
            }
            await deleteFolder(
                `files/${classroom.user.username}/class/${classroom.id}/test/${test.id}`
            )
            if (location.pathname.includes(`/test/${test?.id}/details`)) {
                navigate(`/class/${test?.classroom?.id}/tests`)
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

    return (
        <Modal
            className="testDeleteModal"
            show={showDeleteModal}
            onHide={() => {
                setShowDeleteModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete test</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                Are you sure you want to delete this test?
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary me-3"
                    onClick={() => {
                        setShowDeleteModal(false)
                    }}
                >
                    Cancel
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

export default DeleteTest
