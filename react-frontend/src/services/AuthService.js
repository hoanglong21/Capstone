import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1/auth'

class AuthService {
    registration(user) {
        return axios.post(API_BASE_URL + '/register', user)
    }

    login(user) {
        return axios.post(API_BASE_URL + '/login', user)
    }

    logout() {
        localStorage.removeItem('token')
    }
}

export default new AuthService()
