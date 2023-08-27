import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import StudySetService from '../../services/StudySetService'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const DeleteSet = ({
    studySet,
    showDeleteModal,
    setShowDeleteModal,
    isDelete,
    setIsDelete,
}) => {
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
            setShowDeleteModal(false)
            if (isDelete === false) {
                setIsDelete(true)
            } else {
                navigate('/')
            }
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

    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

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
                    {t('deleteSet')}?
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
                <p className="mb-1">{t('msg10')}.</p>
                <p className="fw-semibold">{t('msg11')}.</p>
            </Modal.Body>
            <Modal.Footer className="px-4">
                <button
                    type="button"
                    className="btn btn-secondary classModalBtn me-3"
                    onClick={() => {
                        setShowDeleteModal(false)
                    }}
                >
                    {t('close')}
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
                        'Move to trash'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteSet
