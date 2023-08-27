import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import AssignmentService from '../../../services/AssignmentService'
import { deleteFolder } from '../../../features/fileManagement'

import './assignment.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const DeleteAssignment = ({
    isDelete,
    setIsDelete,
    assign,
    showDeleteModal,
    setShowDeleteModal,
}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);
    const handleSubmit = async () => {
        // clear validation
        setLoading(true)
        try {
            await AssignmentService.deleteAssignment(assign?.id)
            if (isDelete === false) {
                setShowDeleteModal(false)
                setIsDelete(true)
            }
            deleteFolder(
                `files/${assign.classroom.user.username}/class/${assign.classroom.id}/assignment/${assign.id}`
            )
            if (
                location.pathname.includes(`/assignment/${assign?.id}/details`)
            ) {
                navigate(`/class/${assign?.classroom?.id}/assignments`)
            }
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
                <Modal.Title>{t('deleAss')}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>{t('msg79')}</Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary me-3"
                    onClick={() => {
                        setShowDeleteModal(false)
                    }}
                >
                    {t('close')}
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
