import { useState } from 'react'
import AuthService from '../../services/AuthService'
import { Link, useNavigate } from 'react-router-dom'

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

    const registration = async (e) => {
        e.preventDefault()
        AuthService.registration(user).then(() => {
            navigate('/login')
        })
    }

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div>
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
                                name="lastName"
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
                                className="btn-group d-block"
                                role="group"
                                aria-label="role toggle"
                            >
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="roles"
                                    id="learner"
                                    value="ROLE_LEANER"
                                    autoComplete="off"
                                    checked
                                    onChange={handleChange}
                                />
                                <label
                                    className={`btn btn-outline-warning ${styles.labelRadio}`}
                                    htmlFor="learner"
                                >
                                    Learner
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="roles"
                                    id="tutor"
                                    value="ROLE_TUTOR"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                <label
                                    className={`btn btn-outline-warning ${styles.labelRadio}`}
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
