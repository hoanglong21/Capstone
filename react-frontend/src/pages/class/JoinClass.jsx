import React, { useState } from 'react'

import FormStyles from '../../assets/styles/Form.module.css'
import '../../assets/styles/popup.css'
import ClassService from '../../services/ClassService'

const JoinClass = () => {
    const [classCode, setClassCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        var form = document.querySelector('.needs-validation')
        const classCodeEl = document.getElementById('class_code')
        // clear validation
        form.classList.remove('was-validated')
        classCodeEl.classList.remove('is-invalid')
        setError('')

        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            setError('Class code cannot be empty.')
            classCodeEl.classList.add('is-invalid')
        } else {
            try {
                // const temp = (await ClassService.createClassroom(newClass)).data
                // navigate(`/class/${temp.id}`)
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data)
                } else {
                    setError(error.message)
                }
            }
            document.getElementById('closeModal').click()
        }

        setLoading(false)
    }

    return (
        <div className="modal fade classModal" tabIndex="-1" id="joinModal">
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-header border-0">
                        <h5 className="modal-title classModalTitle">
                            Join class
                        </h5>
                        <button
                            id="closeModal"
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
                                    id="class_code"
                                    name="class_code"
                                    type="text"
                                    className={`form-control ${FormStyles.formControl}`}
                                    placeholder="Enter a class code"
                                    required
                                />
                                <label htmlFor="class_code">Class code</label>
                            </div>
                            <div className="text-end">
                                <button
                                    className="btn btn-primary classModalBtn mt-3"
                                    onClick={handleSubmit}
                                >
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JoinClass
