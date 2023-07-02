import { useState } from 'react'
import { Link } from 'react-router-dom'

import FormStyles from '../../assets/styles/Form.module.css'
import UserService from '../../services/UserService'

const ForgotPassword = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleForgot = async (event) => {
        event.preventDefault()
        setLoading(true)
        setSuccess(false)
        try {
            var form = document.querySelector('.needs-validation')
            // clear validation
            form.classList.remove('was-validated')
            setError('')

            form.classList.add('was-validated')
            if (!username) {
                setError('You did not enter a username')
            } else {
                const res = await UserService.sendResetPasswordEmail(username)
                setEmail(res.data)
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

    function hideEmail(userEmail) {
        const partialEmail = userEmail.replace(
            /(\w{3})[\w.-]+@([\w.]{3})[\w.]{3}/,
            '$1***@$2***'
        )
        return partialEmail
    }

    if (!success) {
        return (
            <div className="container">
                <h2>Forgot Password</h2>
                <p className="m-0">
                    Enter your username or the email address you signed up with.
                    We'll email you a link to log in and reset your password.
                </p>
                <form className="form needs-validation mt-4" noValidate>
                    {/* error message */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            name="username"
                            className={`form-control ${FormStyles.formControl} ${FormStyles.formControl_noLabel}`}
                            placeholder="Username or email address"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="form-group mt-4">
                        <button
                            className={`btn btn-primary ${FormStyles.btn}`}
                            onClick={handleForgot}
                        >
                            {loading ? (
                                <div
                                    className="spinner-border text-secondary mx-auto mb-1"
                                    role="status"
                                    id="loading"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div className="container">
                <h2>Check your email!</h2>
                <p>
                    We've sent an email to{' '}
                    {hideEmail(email ? 'tuyetntahe153175@fpt.edu.vn' : '')}
                </p>
                <p>
                    Please check your spam folder if you don't see the email in
                    your inbox.
                </p>
                <a
                    className="link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                >
                    Need more help?
                </a>
            </div>
        )
    }
}

export default ForgotPassword
