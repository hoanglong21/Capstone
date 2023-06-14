import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import AuthService from '../services/AuthService'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { login as setLogin } from '../state/authSlice'
import logo from '../assets/images/Quizlet-Logo.png'
import illustration from '../assets/images/study.jpg'
import styles from '../assets/styles/Form.module.css'

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' })
    const isLoggedIn = useSelector((state) => state.auth.token)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if (isLoggedIn) {
        return <Navigate to="/" />
    }

    const handleLogin = async (event) => {
        setError('')
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
            setError('Please complete all fields.')
        } else {
            AuthService.login(user)
                .then((response) => {
                    localStorage.setItem('token', response.data)
                    dispatch(setLogin())
                    navigate('/')
                })
                .catch((error) => {
                    form.classList.remove('was-validated')
                    if (error.message === 'Network Error') {
                        setError('There was a network error.')
                    } else {
                        setError('Incorrect username or password.')
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
        <div className="login bg-white h-100">
            <div className="py-4 px-5 d-flex flex-wrap align-items-center justify-content-start">
                <a
                    href="/"
                    className="d-flex align-items-center ms-5 mb-0 me-auto text-white text-decoration-none"
                >
                    <img
                        className="bi me-5"
                        src={logo}
                        alt="logo"
                        height="32"
                    />
                </a>

                <div className="d-flex">
                    <p>New User?</p>
                    <Link
                        to="/register"
                        className="link-primary text-decoration-none ms-2 me-5 fw-semibold"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-6">
                    <img src={illustration} className="w-100" alt="" />
                </div>
                <div className="col-5">
                    <h2>Welcome Back!</h2>
                    <h5
                        className="fw-normal mb-5"
                        style={{ color: 'var(--text-light)' }}
                    >
                        Login to continue
                    </h5>
                    <form className="form me-5 needs-validation" noValidate>
                        {/* error message */}
                        {error && (
                            <div class="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {/* username/email */}
                        <div className="form-group mb-3">
                            <label className={styles.formLabel}>Username</label>
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
                            <label className={styles.formLabel}>Password</label>
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
                </div>
            </div>
        </div>
    )
}
export default Login
