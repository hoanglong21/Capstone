import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import FormStyles from '../../assets/styles/Form.module.css'
import './CreateClass.css'
import ClassService from '../../services/ClassService'
import { getUser } from '../../features/user/userAction'

export default function CreateClass() {
    let navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const [newClass, setNewClass] = useState({})
    const [error, setError] = useState('')

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
        fetchData()
    }, [])

    const handleChange = (event) => {
        setNewClass({ ...newClass, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var form = document.querySelector('.needs-validation')
        const classNameEl = document.getElementById('class_name')
        // clear validation
        form.classList.remove('was-validated')
        classNameEl.classList.remove('is-invalid')
        setError('')

        form.classList.add('was-validated')
        try {
            if (!form.checkValidity()) {
                setError('Class name cannot be empty.')
                classNameEl.classList.add('is-invalid')
            } else {
                await ClassService.createClassroom(newClass)
                navigate('/sets/classes')
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
    }

    return (
        <div className="modal createClassModal" tabIndex="-1" id="createModal">
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-header border-0">
                        <h5 className="modal-title createClassTitle">
                            Create a new class
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" noValidate>
                            {/* error message */}
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
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
                            <div className="form-floating mb-3">
                                <input
                                    name="description"
                                    type="text"
                                    value={newClass.description || ''}
                                    className={`form-control ${FormStyles.formControl}`}
                                    placeholder="Enter a description"
                                    onChange={handleChange}
                                />
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="text-end">
                                <button
                                    className="btn btn-primary createClass-btn mt-3"
                                    onClick={handleSubmit}
                                >
                                    Create class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
