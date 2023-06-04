import { useState } from 'react'
import AuthService from '../../services/AuthService'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import logo from '../../assets/images/Quizlet-Logo.png'
import illustration from '../../assets/images/study.jpg'
import styles from '../../assets/styles/Form.module.css'

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roles: '',
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registration = (e) => {
        e.preventDefault()
        AuthService.registration(user).then((res) => {
            navigate('/login')
        })
    }

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <div className="mb-5 py-4 px-5 d-flex flex-wrap align-items-center justify-content-start">
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
            <div className="d-flex flex-row align-items-center h-100">
                <div
                    className="col-6"
                    style={{
                        background: `url(${illustration}) no-repeat center bottom/cover`,
                        height: '100%',
                    }}
                />
                <div className="col-6 p-5">
                    <h1>Get Started</h1>
                    <h5
                        className="fw-normal"
                        style={{ color: 'var(--text-light)' }}
                    >
                        Create your account now
                    </h5>
                    <form className="form mt-5 me-5">
                        {/* username/email */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Username</label>
                            <input
                                placeholder="Type your username"
                                name="username"
                                className={`form-control ${styles.formControl}`}
                                value={user.username}
                                onChange={handleChange}
                            />
                        </div>
                        {/* First name */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>
                                First Name
                            </label>
                            <input
                                placeholder="Type your first name"
                                name="firstName"
                                className={`form-control ${styles.formControl}`}
                                value={user.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Last name */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>
                                Last Name
                            </label>
                            <input
                                placeholder="Type your last name"
                                name="firstName"
                                className={`form-control ${styles.formControl}`}
                                value={user.lastName}
                                onChange={handleChange}
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
                            />
                        </div>
                        {/* Role */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Role</label>
                            <div
                                class="btn-group d-block"
                                role="group"
                                aria-label="role toggle"
                            >
                                <input
                                    type="radio"
                                    class="btn-check"
                                    name="role"
                                    id="learner"
                                    value="ROLE_LEANER"
                                    autocomplete="off"
                                    checked
                                />
                                <label
                                    className={`btn btn-outline-warning px-4 py-3 col-4 ${styles.labelRadio}`}
                                    for="learner"
                                >
                                    Learner
                                </label>

                                <input
                                    type="radio"
                                    class="btn-check"
                                    name="role"
                                    id="tutor"
                                    value="ROLE_TUTOR"
                                    autocomplete="off"
                                />
                                <label
                                    class="btn btn-outline-warning px-5 py-3 col-4"
                                    for="tutor"
                                >
                                    Tutor
                                </label>
                            </div>
                        </div>
                        {/* register btn */}
                        <div className="form-group mt-5">
                            <button
                                className={`btn btn-primary col-12 ${styles.btn}`}
                                onClick={registration}
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
