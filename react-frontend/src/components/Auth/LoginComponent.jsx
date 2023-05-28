import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const withNavigateHook = (Component) => {
    return (props) => {
        const navigation = useNavigate();

        return <Component navigation={navigation} {...props} />
    }
}



class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    login = async (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password};
        // console.log('user => ' + JSON.stringify(user));
        AuthService.login(user).then(response => {
            const token  =  response.data;
            localStorage.setItem("token", token);
            this.props.navigation('/');
          });
        
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value})
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    render() {
            return (
                <div className="row">
            <div className="col-md-6 offset-md-3">

                <div >
                    <div className="alert alert-danger">Invalid username or Password</div>
                </div>
                <div >
                    <div className="alert alert-success"> You have been logged out.</div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">Login Form</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="control-label"> username</label>
                                <input placeholder='username Address' name='username' className='form-control' 
                                        value={this.state.username} onChange={this.changeUsernameHandler}/>
                            </div>

                            <div className="form-group mb-3">
                                <label className="control-label"> Password</label>
                                <input type="password" placeholder='Enter password' name='password' className='form-control' 
                                        value={this.state.password} onChange={this.changePasswordHandler}/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-primary" onClick={this.login}>Submit</button>
                                <span> Not registered ?
                                    <a href="/register">Register/Signup here</a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default withNavigateHook(LoginComponent);