import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import StudySetService from '../../services/StudySetService'

const DeleteSet = ({ studySet, showDeleteModal, setShowDeleteModal }) => {
    let navigate = useNavigate()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // clear validation
        setError('')
        setLoading(true)
        try {
            await StudySetService.deleteStudySet(studySet.id)
            document.getElementById('closeDeleteSetModal').click()
            navigate('/')
            // clear validation
            setError('')
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
            id="deleteSetModal"
            show={showDeleteModal}
            onHide={() => {
                setShowDeleteModal(false)
            }}
        >
            <Modal.Header closeButton className="border-0 px-4">
                <Modal.Title className="setModalTitle">
                    Delete this set?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                {/* error message */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="setModalHeading mb-1">{studySet?.title}</div>
                <p className="mb-1">
                    You are about to delete this set and all of its data. No one
                    will be able to access this set ever again.
                </p>
                <p className="fw-semibold">
                    Are you sure? This cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer className="px-4">
                <button
                    type="button"
                    className="btn btn-secondary classModalBtn me-3"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
                <button
                    className="btn btn-danger classModalBtn"
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
                        'Yes, delete this set'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteSet
