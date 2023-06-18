import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { login } from '../features/auth/authAction'

import logo from '../assets/images/logo-1.png'
import styles from '../assets/styles/Form.module.css'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const { loading, userInfo, error } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitForm = (data) => {
        var form = document.querySelector('.needs-validation')
        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            return
        }
        dispatch(login(data))
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
                            onSubmit={handleSubmit(submitForm)}
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
                                    {...register('username')}
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
                                    {...register('password')}
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
                                    type="submit"
                                    className={`btn btn-primary col-12 ${styles.btn}`}
                                    disabled={loading}
                                >
                                    {loading ? (
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
                                        'Login'
                                    )}
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
