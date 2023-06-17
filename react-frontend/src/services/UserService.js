import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

class UserService {
    getUser(username) {
        return axios.get(API_BASE_URL + '/users/' + username)
    }
}

export default new UserService()
