import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST + '/auth'

const registration = (user) => {
    return axios.post(API_BASE_URL + '/register', user)
}

const login = (user) => {
    return axios.post(API_BASE_URL + '/login', user)
}

const logout = () => {
    const temptToken = localStorage.getItem('userToken')
    if (temptToken) {
        localStorage.removeItem('userToken')
        return axios.get(API_BASE_URL + '/logout?token=' + temptToken)
    }
}

const AuthService = {
    registration,
    login,
    logout,
}

export default AuthService
