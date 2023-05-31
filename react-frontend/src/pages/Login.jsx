import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import AuthService from '../services/AuthService'
import { useDispatch } from 'react-redux'
import { login as setLogin } from '../state/authSlice'

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
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div>
                    <div className="alert alert-danger">
                        Invalid username or Password
                    </div>
                </div>
                <div>
                    <div className="alert alert-success">
                        {' '}
                        You have been logged out.
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">Login Form</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="control-label">
                                    username
                                </label>
                                <input
                                    placeholder="username Address"
                                    name="username"
                                    className="form-control"
                                    value={user.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="control-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    className="form-control"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={login}
                                >
                                    Submit
                                </button>
                                <span>
                                    Not registered ?
                                    <a href="/register">Register/Signup here</a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
