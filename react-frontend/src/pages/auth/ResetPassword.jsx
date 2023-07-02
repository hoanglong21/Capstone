import { useState } from 'react'
import FormStyles from '../../assets/styles/Form.module.css'

const ResetPassword = () => {
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleReset = async (event) => {
        event.preventDefault()
        setLoading(true)
        setSuccess(false)
        try {
            var form = document.querySelector('.needs-validation')
            // clear validation
            form.classList.remove('was-validated')
            setError('')

            form.classList.add('was-validated')
            if (!newPass) {
                setError('You did not enter a username')
            } else {
                setSuccess(true)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
        setLoading(false)
    }

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <form className="needs-validation mt-4" noValidate>
                <div className="form-floating mb-3">
                    <input
                        id="newPass"
                        name="newPass"
                        type="text"
                        value={newPass}
                        className={`form-control ${FormStyles.formControl}`}
                        placeholder="New password"
                        onChange={(event) => {
                            setNewPass(event.target.value)
                        }}
                        required
                    />
                    <label htmlFor="newPass">New password</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        id="confirmPass"
                        name="confirmPass"
                        type="text"
                        value={confirmPass}
                        className={`form-control ${FormStyles.formControl}`}
                        placeholder="Confirm password"
                        onChange={(event) => {
                            setConfirmPass(event.target.value)
                        }}
                        required
                    />
                    <label htmlFor="confirmPass">Confirm password</label>
                </div>
                <div className="form-group mt-5">
                    <button
                        className={`btn btn-primary ${FormStyles.btn}`}
                        onClick={handleReset}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
export default ResetPassword
