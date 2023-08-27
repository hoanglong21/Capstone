import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import UserService from '../../services/UserService'
import { logout } from '../../features/auth/authSlice'
import './settings.css'
import FormStyles from '../../assets/styles/Form.module.css'
import { useTranslation } from 'react-i18next'

const DeleteAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.user)

    const [currentPass, setCurrentPass] = useState('')
    const [error, setError] = useState('')

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        var form = document.querySelector('.needs-validation')
        const currentPassEl = document.getElementById('currentPass')
        // clear validation
        form.classList.remove('was-validated')
        currentPassEl.classList.remove('is-invalid')
        setError('')

        form.classList.add('was-validated')
        try {
            if (
                !form.checkValidity() ||
                !(
                    await UserService.checkMatchPassword(
                        userInfo.username,
                        currentPass
                    )
                ).data
            ) {
                setError('The password you entered was incorrect.')
                currentPassEl.classList.add('is-invalid')
            } else {
                setShowConfirmModal(true)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    const handleDelete = async () => {
        try {
            await UserService.deleteUser(userInfo.username)
            setShowConfirmModal(false)
            dispatch(logout())
            sessionStorage.setItem('isAccountDeleted', 'true')
            navigate('/account-deleted')
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
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
        <div className="settings-lang">
            <h4 className="settings-h4">
                {t('perDelete')} {userInfo.username}
            </h4>
            <p className="settings-p">{t('msg53')}</p>
            <form className="mt-4 needs-validation" noValidate>
                {/* error message */}
                {error && (
                    <div
                        className="alert alert-danger col-12 mb-2"
                        role="alert"
                    >
                        {error}
                    </div>
                )}
                <div className="form-group mb-3">
                    <label className={FormStyles.formLabel}>
                        {t('current')} {t('password')}
                    </label>
                    <input
                        id="currentPass"
                        name="currentPass"
                        type="password"
                        value={currentPass}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={(event) => setCurrentPass(event.target.value)}
                        required
                    />
                    <p
                        className="mt-2 settings-p"
                        style={{ color: 'var(--text-light)' }}
                    >
                        {t('msg54')}
                    </p>
                </div>
                <button
                    className="btn btn-danger px-4 mt-4"
                    onClick={handleSubmit}
                >
                    {t('delete')} {t('account')}
                </button>
            </form>
            {/* Confirm Modal */}
            <Modal
                show={showConfirmModal}
                onHide={() => {
                    setShowConfirmModal(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t('delete')} {t('account')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('msg55')}.</Modal.Body>
                <Modal.Footer>
                    <button
                        id="closeModal"
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setShowConfirmModal(false)
                        }}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        {t('delete')} {userInfo.username} {t('account')}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default DeleteAccount
