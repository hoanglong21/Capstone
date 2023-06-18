import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { register as userRegister } from '../features/auth/authAction'

import logo from '../assets/images/logo-1.png'
import styles from '../assets/styles/Form.module.css'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    )
    const { register, handleSubmit } = useForm()

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/')
        // set error validation
    }, [navigate, userInfo, success])

    const submitForm = async (data) => {
        // clear error validation
        document.querySelector('#username').classList.remove('is-invalid')
        document.querySelector('#email').classList.remove('is-invalid')

        var form = document.querySelector('.needs-validation')
        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            return
        }
        dispatch(userRegister(data))

        if (error === 'Username already registered') {
            form.classList.remove('was-validated')
            document.querySelector('#username').classList.add('is-invalid')
        }
        if (error === 'Email already registered') {
            form.classList.remove('was-validated')
            document.querySelector('#email').classList.add('is-invalid')
        }
    }

    return (
        <div className="bg-white p-5">
            <div className="row">
                <div className="col d-flex align-items-start">
                    <img src={logo} className="w-100" alt="" />
                </div>
                <div className="col-6 pe-5">
                    <h2>Get Started</h2>
                    <h5
                        className="fw-normal"
                        style={{ color: 'var(--text-light)' }}
                    >
                        Create your account now
                    </h5>
                    <form
                        className="form me-5 pe-5 needs-validation"
                        style={{ marginTop: '4rem' }}
                        onSubmit={handleSubmit(submitForm)}
                        noValidate
                    >
                        {/* error message */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {/* username */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Username</label>
                            <input
                                placeholder="Type your username"
                                id="username"
                                name="username"
                                className={`form-control ${styles.formControl}`}
                                {...register('username')}
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
                                {...register('first_name')}
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
                                {...register('last_name')}
                                required
                            />
                        </div>
                        {/* Email */}
                        <div className="form-group mb-4">
                            <label className={styles.formLabel}>Email</label>
                            <input
                                placeholder="Type your email"
                                id="email"
                                name="email"
                                type="email"
                                className={`form-control ${styles.formControl}`}
                                {...register('email')}
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
                                {...register('password')}
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
                                    {...register('role')}
                                    required
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="learner"
                                >
                                    Learner
                                </label>
                            </div>
                            <div className="form-check mb-4 form-check-inline">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="role"
                                    id="tutor"
                                    value="ROLE_TUTOR"
                                    autoComplete="off"
                                    {...register('role')}
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
                                    'Register'
                                )}
                            </button>
                        </div>
                    </form>
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
            </div>
        </div>
    )
}
export default Register
