import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AuthService from '../services/AuthService'
import { useDispatch, useSelector } from 'react-redux'

import { login as setLogin } from '../state/authSlice'
import logo from '../assets/images/logo-1.png'
import styles from '../assets/styles/Form.module.css'

const Login = () => {
    const EMPTY_MESS = 'Please complete all fields.'
    const NETWORK_MESS = 'There was a network error.'
    const WRONG_MESS = 'Incorrect username or password.'

    const [user, setUser] = useState({ username: '', password: '' })
    const isLoggedIn = useSelector((state) => state.auth.token)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
            return () => {}
        }
    }, [isLoggedIn])

    const handleLogin = async (event) => {
        event.preventDefault()
        setError('')
        document.querySelector('#loading').classList.remove('d-none')
        document.querySelector('#loading').classList.add('d-block')
        document
            .querySelector('#username')
            .classList.remove('is-invalid', 'is-valid')
        document
            .querySelector('#password')
            .classList.remove('is-invalid', 'is-valid')
        var form = document.querySelector('.needs-validation')
        event.preventDefault()
        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            event.stopPropagation()
            setError(EMPTY_MESS)
        } else {
            AuthService.login(user)
                .then((response) => {
                    localStorage.setItem('token', response.data)
                    dispatch(setLogin())
                    navigate('/')
                })
                .catch((error) => {
                    form.classList.remove('was-validated')
                    document
                        .querySelector('#loading')
                        .classList.remove('d-block')
                    document.querySelector('#loading').classList.add('d-none')
                    if (error.message === 'Network Error') {
                        setError(NETWORK_MESS)
                    } else {
                        setError(WRONG_MESS)
                        document
                            .querySelector('#username')
                            .classList.add('is-invalid')
                        document
                            .querySelector('#password')
                            .classList.add('is-invalid')
                    }
                })
        }
    }

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div className="login bg-white h-100 p-5">
            <div className="row px-4">
                <div className="col d-flex align-items-start">
                    <img src={logo} className="w-100" alt="" />
                </div>
                <div className="col-6 mt-4 me-5 pe-5">
                    <div className="container me-5">
                        <h2>Welcome Back!</h2>
                        <h5
                            className="fw-normal mb-5"
                            style={{ color: 'var(--text-light)' }}
                        >
                            Login to continue
                        </h5>
                        <form
                            className="form needs-validation pe-4"
                            style={{ marginTop: '5rem' }}
                            noValidate
                        >
                            {/* error message */}
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            {/* Loading */}
                            <div
                                className="spinner-border text-secondary d-none mx-auto mb-1"
                                role="status"
                                id="loading"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                            {/* username/email */}
                            <div className="form-group mb-3">
                                <label className={styles.formLabel}>
                                    Username
                                </label>
                                <input
                                    placeholder="Type your username or email address"
                                    name="username"
                                    id="username"
                                    className={`form-control ${styles.formControl}`}
                                    value={user.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* password */}
                            <div className="form-group mb-3">
                                <label className={styles.formLabel}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Type your password"
                                    name="password"
                                    id="password"
                                    className={`form-control ${styles.formControl}`}
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* forgot */}
                            <div className="d-flex justify-content-end">
                                <a
                                    href="/forgot"
                                    className="mb-5 link-primary text-decoration-none fw-semibold"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            {/* login btn */}
                            <div className="form-group mt-4">
                                <button
                                    className={`btn btn-primary col-12 ${styles.btn}`}
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="d-flex mt-4">
                            <p>New User?</p>
                            <Link
                                to="/register"
                                className="link-primary text-decoration-none ms-2 me-5 fw-semibold"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
