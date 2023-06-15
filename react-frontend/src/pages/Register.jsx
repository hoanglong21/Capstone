import { useEffect, useState } from 'react'
import AuthService from '../services/AuthService'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import logo from '../assets/images/Quizlet-Logo.png'
import illustration from '../assets/images/study.jpg'
import styles from '../assets/styles/Form.module.css'
import { useSelector } from 'react-redux'

const Register = () => {
    const EMPTY_MESS = 'Please complete all fields.'
    const NETWORK_MESS = 'There was a network error.'
    const EXIST_MESS = 'Username or email is taken. Try another.'

    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: '',
    })
    const [error, setError] = useState('')
    const isLoggedIn = useSelector((state) => state.auth.token)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            return <Navigate to="/" />
        }
    }, [isLoggedIn])

    const handleRegister = async (event) => {
        event.preventDefault()

        setError('')
        document.querySelector('#loading').classList.remove('d-none')
        document.querySelector('#username').classList.remove('is-invalid')
        document.querySelector('#email').classList.remove('is-invalid')

        var form = document.querySelector('.needs-validation')
        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            document.querySelector('#loading').classList.add('d-none')
            event.stopPropagation()
            setError(EMPTY_MESS)
        } else {
            AuthService.registration(user)
                .then(() => {
                    document.querySelector('#loading').classList.add('d-none')
                    document.querySelector('#modalBtn').click()
                })
                .catch((error) => {
                    form.classList.remove('was-validated')
                    document.querySelector('#loading').classList.add('d-none')
                    if (error.message === 'Network Error') {
                        setError(NETWORK_MESS)
                    } else {
                        setError(EXIST_MESS)
                        document
                            .querySelector('#username')
                            .classList.add('is-invalid')
                        document
                            .querySelector('#email')
                            .classList.add('is-invalid')
                    }
                })
        }
    }

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div className="bg-white">
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
                    <p>Have an account?</p>
                    <Link
                        to="/login"
                        className="link-primary text-decoration-none ms-2 me-5 fw-semibold"
                    >
                        Login
                    </Link>
                </div>
            </div>
            <div className="d-flex flex-row align-items-center">
                <div className="col-6">
                    <img src={illustration} className="w-100" alt="" />
                </div>
                <div className="col-6">
                    <h2>Get Started</h2>
                    <h5
                        className="fw-normal"
                        style={{ color: 'var(--text-light)' }}
                    >
                        Create your account now
                    </h5>
                    <form
                        className="form mt-5 me-5 needs-validation"
                        noValidate
                    >
                        {/* error message */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {/* Loading */}
                        <div
                            className="spinner-border text-secondary d-block d-none mx-auto mb-1"
                            role="status"
                            id="loading"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        {/* username */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Username</label>
                            <input
                                placeholder="Type your username"
                                id="username"
                                name="username"
                                className={`form-control ${styles.formControl}`}
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                Please use a valid username
                            </div>
                        </div>
                        {/* First name */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>
                                First Name
                            </label>
                            <input
                                placeholder="Type your first name"
                                name="first_name"
                                className={`form-control ${styles.formControl}`}
                                value={user.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Last name */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>
                                Last Name
                            </label>
                            <input
                                placeholder="Type your last name"
                                name="last_name"
                                className={`form-control ${styles.formControl}`}
                                value={user.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Email */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Email</label>
                            <input
                                placeholder="Type your email"
                                name="email"
                                type="email"
                                id="email"
                                className={`form-control ${styles.formControl}`}
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                Please use a valid email address
                            </div>
                        </div>
                        {/* Password */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                className={`form-control ${styles.formControl}`}
                                value={user.password}
                                onChange={handleChange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                required
                            />
                            <div className="invalid-feedback">
                                <ul>
                                    Password must contain the following:
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
                                </ul>
                            </div>
                        </div>
                        {/* Role */}
                        <div className="form-group mb-4">
                            <label className={`d-block ${styles.formLabel}`}>
                                Role
                            </label>
                            <div className="form-check form-check-inline me-5">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="role"
                                    id="learner"
                                    value="ROLE_LEARNER"
                                    autoComplete="off"
                                    onClick={handleChange}
                                    required
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="learner"
                                >
                                    Learner
                                </label>
                            </div>
                            <div className="form-check mb-3 form-check-inline">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="role"
                                    id="tutor"
                                    value="ROLE_TUTOR"
                                    autoComplete="off"
                                    onClick={handleChange}
                                    required
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="tutor"
                                >
                                    Tutor
                                </label>
                            </div>
                        </div>
                        {/* register btn */}
                        <div className="form-group mt-5">
                            <button
                                className={`btn btn-primary col-12 ${styles.btn}`}
                                onClick={handleRegister}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Button trigger modal */}
            <button
                type="button"
                id="modalBtn"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#messModal"
            >
                Launch modal
            </button>
            {/* Modal after register */}
            <div
                className="modal fade"
                id="messModal"
                tabindex="-1"
                aria-labelledby="messModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="messModalLabel"
                            >
                                Success!
                            </h1>
                            <button
                                type="button"
                                id="modalCloseBtn"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h5>You have registered for your account</h5>
                            <p>
                                Check your email for your account activation
                                link
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    document
                                        .querySelector('#modalCloseBtn')
                                        .click()
                                    navigate('/login')
                                }}
                            >
                                Go to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register
