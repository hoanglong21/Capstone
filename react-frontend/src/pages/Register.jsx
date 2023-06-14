import { useState } from 'react'
import AuthService from '../services/AuthService'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import logo from '../assets/images/Quizlet-Logo.png'
import illustration from '../assets/images/study.jpg'
import styles from '../assets/styles/Form.module.css'
import { useSelector } from 'react-redux'

const Register = () => {
    const EMPTY_MESS = 'Please complete all fields.'
    const NETWORK_MESS = 'There was a network error.'
    const WRONG_MESS = 'Incorrect username or password.'

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

    if (isLoggedIn) {
        return <Navigate to="/" />
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        setError('')
        document.querySelector('#loading').classList.remove('d-none')
        var form = document.querySelector('.needs-validation')
        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            document.querySelector('#loading').classList.add('d-none')
            event.stopPropagation()
            setError(EMPTY_MESS)
        } else {
            AuthService.registration(user)
                .then((response) => {
                    navigate('/login')
                })
                .catch((error) => {
                    form.classList.remove('was-validated')
                    document.querySelector('#loading').classList.add('d-none')
                    if (error.message === 'Network Error') {
                        setError(NETWORK_MESS)
                    } else {
                        setError(WRONG_MESS)
                        // document
                        //     .querySelector('#username')
                        //     .classList.add('is-invalid')
                        // document
                        //     .querySelector('#password')
                        //     .classList.add('is-invalid')
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
                        {/* username/email */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Username</label>
                            <input
                                placeholder="Type your username"
                                name="username"
                                className={`form-control ${styles.formControl}`}
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
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
                                className={`form-control ${styles.formControl}`}
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
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
                                required
                            />
                        </div>
                        {/* Role */}
                        <div className="form-group mb-4">
                            <label className={`d-block ${styles.formLabel}`}>
                                Role
                            </label>
                            <div class="form-check form-check-inline me-5">
                                <input
                                    type="radio"
                                    class="form-check-input"
                                    name="role"
                                    id="learner"
                                    value="ROLE_LEARNER"
                                    autoComplete="off"
                                    onClick={handleChange}
                                    required
                                />
                                <label class="form-check-label" for="learner">
                                    Learner
                                </label>
                            </div>
                            <div class="form-check mb-3 form-check-inline">
                                <input
                                    type="radio"
                                    class="form-check-input"
                                    name="role"
                                    id="tutor"
                                    value="ROLE_TUTOR"
                                    autoComplete="off"
                                    onClick={handleChange}
                                    required
                                />
                                <label class="form-check-label" for="tutor">
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
        </div>
    )
}
export default Register
