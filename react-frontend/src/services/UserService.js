import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

export const getUser = (username) => {
    return axios.get(API_BASE_URL + '/users/' + username)
}

const UserService = {
    getUser,
}

export default UserService
