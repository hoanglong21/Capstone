import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

import ClassService from '../../services/ClassService'

import FormStyles from '../../assets/styles/Form.module.css'

export default function CreateClass({ showCreateModal, setShowCreateModal }) {
    let navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const [newClass, setNewClass] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (showCreateModal === false) {
            setNewClass({
                class_name: '',
                description: '',
                user: {
                    id: userInfo?.id,
                    username: userInfo?.username,
                },
            })
            setError('')
            document
                .getElementById('createClassForm')
                ?.classList?.remove('was-validated')
            document
                .getElementById('class_name')
                ?.classList.remove('is-invalid')
        }
    }, [showCreateModal])

    useEffect(() => {
        const fetchData = () => {
            setNewClass({
                class_name: '',
                description: '',
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                },
            })
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo])

    const handleChange = (event) => {
        setNewClass({ ...newClass, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(newClass)
        var form = document.getElementById('createClassForm')
        const classNameEl = document.getElementById('class_name')
        // clear validation
        form.classList.remove('was-validated')
        classNameEl.classList.remove('is-invalid')
        setError('')
        // validation
        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            setError('Class name cannot be empty.')
            classNameEl.classList.add('is-invalid')
        } else {
            try {
                const temp = (await ClassService.createClassroom(newClass)).data
                setNewClass(temp)
                setShowCreateModal(false)
                navigate(`/class/${temp.id}`)
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
            show={showCreateModal}
            onHide={() => {
                setShowCreateModal(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5 className="modal-title joinClassModalTitle">
                        Create a new class
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">
                <form
                    id="createClassForm"
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
                            value={newClass.class_name || ''}
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
                            value={newClass.description || ''}
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
                        'Create class'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    )
}
