import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import ClassService from '../../services/ClassService'

import FormStyles from '../../assets/styles/Form.module.css'

const JoinClass = ({ showJoinModal, setShowJoinModal }) => {
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const [classCode, setClassCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (showJoinModal === false) {
            setClassCode('')
            setError('')
            document
                .getElementById('joinClassForm')
                ?.classList?.remove('was-validated')
            document.getElementById('classCode')?.classList.remove('is-invalid')
        }
    }, [showJoinModal])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        var form = document.getElementById('joinClassForm')
        const classCodeEl = document.getElementById('classCode')
        // clear validation
        form.classList.remove('was-validated')
        classCodeEl.classList.remove('is-invalid')
        setError('')
        // validation
        form.classList.add('was-validated')
        if (!classCode) {
            setError('Class code cannot be empty.')
            classCodeEl.classList.add('is-invalid')
        } else {
            try {
                const temp = (
                    await ClassService.joinClass(classCode, userInfo.username)
                ).data
                navigate(`/class/${temp.id}`)
                setShowJoinModal(false)
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data)
                } else {
                    setError(error.message)
                }
            }
        }
        setLoading(false)
    }

    return (
        <Modal
            className="joinClassModal"
            show={showJoinModal}
            onHide={() => {
                setShowJoinModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4 className="modal-title editClassModalTitle">
                        Join class
                    </h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">
                <form
                    id="joinClassForm"
                    className="needs-validation"
                    noValidate
                >
                    {/* error message */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {/* Class code */}
                    <div className="form-floating">
                        <input
                            id="classCode"
                            name="classCode"
                            type="text"
                            className={`form-control ${FormStyles.formControl}`}
                            placeholder="Enter a class code"
                            value={classCode || ''}
                            onChange={(event) => {
                                setClassCode(event.target.value)
                            }}
                            required
                        />
                        <label htmlFor="classCode">Class code</label>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <button
                    className="btn btn-primary editClassModalBtn"
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
                        'Join'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    )
}
export default JoinClass
