import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import ClassService from '../../services/ClassService'

import './classLayout/classLayout.css'

const DeleteClass = ({ classroom, showDeleteModal, setShowDeleteModal }) => {
    let navigate = useNavigate()

    const [deleteClass, setDeleteClass] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (classroom.class_name) {
            setDeleteClass({ ...classroom })
        }
    }, [classroom])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await ClassService.deleteClass(deleteClass.id)
            setShowDeleteModal(false)
            navigate('/')
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
            className="classDeleteModal"
            show={showDeleteModal}
            onHide={() => {
                setShowDeleteModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title className="px-3">
                    <h4 className="modal-title">Delete this class?</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="classDeleteModalHeading mb-4">
                    {deleteClass.class_name}
                </div>
                <p>You are about to delete this class.</p>
                <p className="fw-semibold">
                    Are you sure? This cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary classModalBtn me-3"
                    onClick={() => {
                        setShowDeleteModal(false)
                    }}
                >
                    Close
                </button>
                <button
                    className="btn btn-danger classDeleteModalBtn"
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
                        'Yes, delete this class'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteClass
