import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { login } from '../../features/auth/authAction'
import { reset } from '../../features/auth/authSlice'
import { getUser } from '../../features/user/userAction'

import { ArrowLeftLongIcon } from '../../components/icons'
import styles from '../../assets/styles/Form.module.css'
import './auth.css'
import { useTranslation } from 'react-i18next'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const { register, handleSubmit } = useForm()
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken, error, loading } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [emptyMess, setEmptyMess] = useState('')

    useEffect(() => {
        dispatch(reset())
    }, [])

    useEffect(() => {
        if (userToken) {
            dispatch(getUser(userToken))
        }
    }, [userToken])

    useEffect(() => {
        if (userInfo?.username) {
            if (userInfo.role === 'ROLE_ADMIN') {
                navigate('/dashboard')
            } else {
                navigate('/')
            }
        }
    }, [userToken, userInfo])

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])
    

    const submitForm = (data) => {
        var form = document.querySelector('.needs-validation')
        const usernameEl = document.getElementById('username')
        const passwordEl = document.getElementById('password')
        // clear validation
        form.classList.remove('was-validated')
        usernameEl.classList.remove('is-invalid')
        passwordEl.classList.remove('is-invalid')
        dispatch(reset())
        setEmptyMess('')
        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            if (!data.username || !data.password) {
                setEmptyMess('Please complete all the fields.')
                if (!data.username) {
                    usernameEl.classList.add('is-invalid')
                }
                if (!data.password) {
                    passwordEl.classList.add('is-invalid')
                }
            }
            return
        }
        dispatch(login(data))
        // clear
        form.classList.remove('was-validated')
        usernameEl.classList.remove('is-invalid')
        passwordEl.classList.remove('is-invalid')
        dispatch(reset())
        setEmptyMess('')
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    return (
        <div className="auth-login">
            <button className="backHomeBtn" onClick={() => navigate('/')}>
                <ArrowLeftLongIcon />
            </button>
            <div className="container auth me-5">
                <h2 className="auth-header">{t('welcomeBack')}!</h2>
                <h5
                    className="auth-header-h5 fw-normal"
                    style={{ color: 'var(--text-light)' }}
                >
                    {t('loginToContinue')}
                </h5>
                <form
                    className="authform form needs-validation"
                    // style={{ marginTop: '5rem' }}
                    onSubmit={handleSubmit(submitForm)}
                    noValidate
                >
                    {/* error message */}
                    {(emptyMess || error) && (
                        <div className="error alert alert-danger" role="alert">
                            {emptyMess || error}
                        </div>
                    )}
                    {/* username/email */}
                    <div className="form-group mb-3">
                        <label className={styles.formLabel}>{t('username')}</label>
                        <input
                            placeholder="Type your username or email address"
                            name="username"
                            id="username"
                            className={`form-control ${styles.formControl}`}
                            {...register('username')}
                            required
                        />
                    </div>
                    {/* password */}
                    <div className="form-group mb-3">
                        <label className={styles.formLabel}>{t('password')}</label>
                        <input
                            type="password"
                            placeholder="Type your password"
                            name="password"
                            id="password"
                            className={`form-control ${styles.formControl}`}
                            {...register('password')}
                            required
                        />
                    </div>
                    {/* forgot */}
                    <div className="auth-forgot d-flex justify-content-end">
                        <Link
                            to="/forgotten"
                            className="auth-link link-primary text-decoration-none fw-semibold"
                        >
                           {t('forgotPassword')}?
                        </Link>
                    </div>
                    {/* login btn */}
                    <div className="auth-forgot form-group">
                        <button
                            type="submit"
                            className={`btn btn-primary col-12 ${styles.btn}`}
                            disabled={loading}
                        >
                            {loading === true ? (
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
                                t('login')
                            )}
                        </button>
                    </div>
                </form>
                <div className="auth-forgot d-flex mt-4">
                    <p>{t('newUser')}?</p>
                    <Link
                        to="/register"
                        className="link-primary text-decoration-none ms-2 me-5 fw-semibold"
                    >
                        {t('signup')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Login
