import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

export const getUser = (username) => {
    return axios.get(API_BASE_URL + '/users/' + username)
}

export const updateUser = (username, userDetails) => {
    return axios.put(API_BASE_URL + '/users/' + username, userDetails)
}

export const checkMatchPassword = (username, checkPassword) => {
    return axios.post(API_BASE_URL + '/checkpassword?username=' + username, {
        password: checkPassword,
    })
}

export const changePassword = (username, newPassword) => {
    return axios.post(API_BASE_URL + '/changepassword?username=' + username, {
        password: newPassword,
    })
}

const UserService = {
    getUser,
    updateUser,
    checkMatchPassword,
    changePassword,
}

export default UserService
