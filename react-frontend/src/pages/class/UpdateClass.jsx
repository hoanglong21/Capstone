import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'

import ClassService from '../../services/ClassService'

import FormStyles from '../../assets/styles/Form.module.css'
import './classLayout/classLayout.css'

const UpdateClass = ({
    classroom,
    stateChanger,
    showEditModal,
    setShowEditModal,
}) => {
    const [updateClass, setUpdateClass] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (showEditModal === false) {
            setUpdateClass({ ...classroom })
            setError('')
            document
                .getElementById(`updateClassForm${classroom?.id}`)
                ?.classList?.remove('was-validated')
            document
                .getElementById('class_name')
                ?.classList.remove('is-invalid')
        }
    }, [showEditModal])

    useEffect(() => {
        if (classroom.class_name) {
            setUpdateClass({ ...classroom })
        }
    }, [classroom])

    const handleChange = (event) => {
        setUpdateClass({
            ...updateClass,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        var form = document.getElementById(`updateClassForm${classroom?.id}`)
        const classNameEl = document.getElementById('class_name')
        // clear validation
        form.classList.remove('was-validated')
        classNameEl.classList.remove('is-invalid')
        setError('')
        // validation
        form.classList.add('was-validated')
        if (!updateClass.class_name) {
            setError('Class name cannot be empty.')
            classNameEl.classList.add('is-invalid')
        } else {
            try {
                const temp = (
                    await ClassService.updateClassroom(
                        updateClass,
                        updateClass.id
                    )
                ).data
                setUpdateClass(temp)
                stateChanger(temp)
                setShowEditModal(false)
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
            className="editClassModal"
            show={showEditModal}
            onHide={() => {
                setShowEditModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5 className="modal-title editClassModalTitle">
                        Edit class
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">
                <form
                    id={`updateClassForm${classroom?.id}`}
                    className="needs-validation"
                    noValidate
                >
                    {/* error message */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {/* Class name */}
                    <div className="form-floating mb-3">
                        <input
                            id="class_name"
                            name="class_name"
                            type="text"
                            value={updateClass.class_name || ''}
                            className={`form-control ${FormStyles.formControl}`}
                            placeholder="Enter a class name"
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="class_name">Class name</label>
                    </div>
                    {/* Description */}
                    <div className="form-floating">
                        <textarea
                            name="description"
                            type="text"
                            value={updateClass.description || ''}
                            className={`form-control ${FormStyles.formControl}`}
                            style={{ height: '6rem' }}
                            placeholder="Enter a description"
                            onChange={handleChange}
                        />
                        <label htmlFor="description">Description</label>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary editClassModalBtn mt-3"
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
                        'Save'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateClass
