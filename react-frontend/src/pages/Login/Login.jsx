import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import AuthService from '../../services/AuthService'
import { useDispatch } from 'react-redux'
import { login as setLogin } from '../../state/authSlice'

import logo from '../../assets/images/Quizlet-Logo.png'
import illustration from '../../assets/images/study.jpg'
import styles from '../../assets/styles/Form.module.css'

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async (e) => {
        e.preventDefault()

        AuthService.login(user).then((response) => {
            const token = response.data
            localStorage.setItem('token', token)
            dispatch(setLogin())
            navigate('/')
        })
    }

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div className="login">
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
                    <h1>Welcome Back!</h1>
                    <h5
                        className="fw-normal"
                        style={{ color: 'var(--text-light)' }}
                    >
                        Login to continue
                    </h5>
                    <form className="form mt-5 me-5">
                        {/* username/email */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Username</label>
                            <input
                                placeholder="Type your username or email address"
                                name="username"
                                className={`form-control ${styles.formControl}`}
                                value={user.username}
                                onChange={handleChange}
                            />
                        </div>
                        {/* password */}
                        <div className="form-group mb-2">
                            <label className={styles.formLabel}>Password</label>
                            <input
                                type="password"
                                placeholder="Type your password"
                                name="password"
                                className={`form-control ${styles.formControl}`}
                                value={user.password}
                                onChange={handleChange}
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
                        <div className="form-group mt-5">
                            <button
                                className={`btn btn-primary col-12 ${styles.btn}`}
                                onClick={login}
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
