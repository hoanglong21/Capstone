import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import UserService from '../../services/UserService'

import FormStyles from '../../assets/styles/Form.module.css'
import './auth.css'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { userToken } = useSelector((state) => state.auth)
    const { userLanguage } = useSelector((state) => state.user)

    const { t, i18n } = useTranslation()
    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])
    const handleReset = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            var form = document.querySelector('.needs-validation')
            const newPassEl = document.getElementById('newPass')
            const confirmPassEl = document.getElementById('confirmPass')
            // clear validation
            form.classList.remove('was-validated')
            newPassEl.classList.remove('is-invalid')
            confirmPassEl.classList.remove('is-invalid')
            setError('')

            form.classList.add('was-validated')
            if (!newPass) {
                setError('Please enter a password.')
                newPassEl.classList.add('is-invalid')
            } else if (!newPass.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
                setError(`<ul>
                        Your new password must contain the following:
                        <li id="letter" className="invalid">
                            A <b>lowercase</b> letter
                        </li>
                        <li id="capital" className="invalid">
                            A <b>capital (uppercase)</b> letter
                        </li>
                        <li id="number" className="invalid">
                            A <b>number</b>
                        </li>
                        <li id="length" className="invalid">
                            Minimum <b>8 characters</b>
                        </li>
                    </ul>`)
                newPassEl.classList.add('is-invalid')
            } else if (confirmPass !== newPass) {
                setError('Your passwords did not match. Type them again.')
                confirmPassEl.classList.add('is-invalid')
                newPassEl.classList.add('is-invalid')
            } else {
                await UserService.resetPassword(
                    searchParams.get('username'),
                    searchParams.get('pin'),
                    newPass
                )
                navigate('/login')
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
            <h2 className="auth-header">{t('msg149')}</h2>
            <form className="needs-validation mt-4" noValidate>
                {/* error message */}
                {error && (
                    <div
                        className="error alert alert-danger"
                        role="alert"
                        dangerouslySetInnerHTML={{ __html: error }}
                    ></div>
                )}
                <div className="form-floating mb-3">
                    <input
                        id="newPass"
                        name="newPass"
                        type="password"
                        value={newPass}
                        className={`form-control ${FormStyles.formControl}`}
                        placeholder="New password"
                        onChange={(event) => {
                            setNewPass(event.target.value)
                        }}
                        required
                    />
                    <label htmlFor="newPass">{t('newP')}</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        id="confirmPass"
                        name="confirmPass"
                        type="password"
                        value={confirmPass}
                        className={`form-control ${FormStyles.formControl}`}
                        placeholder="Confirm password"
                        onChange={(event) => {
                            setConfirmPass(event.target.value)
                        }}
                        required
                    />
                    <label htmlFor="confirmPass">{t('confirmP')}</label>
                </div>
                <div className="form-group mt-5">
                    <button
                        className={`btn btn-primary ${FormStyles.btn}`}
                        onClick={handleReset}
                        disabled={loading}
                    >
                        {loading ? (
                            <div
                                className="spinner-border text-secondary mx-auto mb-1"
                                role="status"
                                id="loading"
                            >
                                <span className="visually-hidden">
                                {t('loading')}...
                                </span>
                            </div>
                        ) : (
                            t('saveP')
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default ResetPassword
