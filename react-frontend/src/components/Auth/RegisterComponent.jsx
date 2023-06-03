import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { useNavigate } from 'react-router-dom'

const withNavigateHook = (Component) => {
    return (props) => {
        const navigation = useNavigate()

        return <Component navigation={navigation} {...props} />
    }
}

class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            roles: '',
        }
    }

    registration = (e) => {
        e.preventDefault()
        let user = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            roles: this.state.roles,
        }
        console.log('user => ' + JSON.stringify(user))
        AuthService.registration(user).then((res) => {
            this.props.navigation('/login')
        })
    }

    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value })
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value })
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value })
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    changeRolesHandler = (event) => {
        this.setState({ roles: event.target.value })
    }

    render() {
        return (
            <div className="row col-md-8 offset-md-2">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">Registration</h2>
                    </div>
                    <div if="${param.success}">
                        <div className="alert alert-info">
                            You have successfully registered our app!
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    placeholder="Username"
                                    name="username"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.changeUsernameHandler}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">First Name</label>
                                <input
                                    placeholder="First Name"
                                    name="firstName"
                                    className="form-control"
                                    value={this.state.firstName}
                                    onChange={this.changeFirstNameHandler}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Last Name</label>
                                <input
                                    placeholder="Last Name"
                                    name="lastName"
                                    className="form-control"
                                    value={this.state.lastName}
                                    onChange={this.changeLastNameHandler}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    placeholder="Email Address"
                                    name="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.changeEmailHandler}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.changePasswordHandler}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">roles</label>
                                <input
                                    placeholder="Enter roles"
                                    name="roles"
                                    className="form-control"
                                    value={this.state.roles}
                                    onChange={this.changeRolesHandler}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.registration}
                                >
                                    Register
                                </button>
                                <span>
                                    Already registered?{' '}
                                    <a href="/login">Login here</a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNavigateHook(RegisterComponent)
