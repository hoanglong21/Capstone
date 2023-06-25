import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

export const getUser = (username) => {
    return axios.get(API_BASE_URL + '/users/' + username)
}

export const updateUser = (username, userDetails) => {
    return axios.put(API_BASE_URL + '/users/' + username, userDetails)
}

const UserService = {
    getUser,
    updateUser,
}

export default UserService
