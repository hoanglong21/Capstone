import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

export const getUser = (username) => {
    return axios.get(API_BASE_URL + '/users/' + username, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

export const updateUser = (username, userDetails) => {
    return axios.put(API_BASE_URL + '/users/' + username, userDetails, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

export const checkMatchPassword = (username, checkPassword) => {
    return axios.post(
        API_BASE_URL + '/checkpassword?username=' + username,
        {
            password: checkPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

export const changePassword = (username, newPassword) => {
    return axios.post(
        API_BASE_URL + '/changepassword?username=' + username,
        {
            password: newPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

export const deleteUser = (username) => {
    return axios.delete(API_BASE_URL + '/users/' + username + '/delete', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

export const sendResetPasswordEmail = (username) => {
    return axios.get(API_BASE_URL + '/sendreset?username=' + username)
}

export const filterUser = (
    name,
    username,
    email,
    gender,
    phone,
    role,
    address,
    bio,
    status,
    fromdob,
    todob,
    frombanned,
    tobanned,
    fromdeleted,
    todeleted,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterusers?name' +
            name +
            '&username' +
            username +
            '&email' +
            email +
            '&gender' +
            gender +
            '&phone' +
            phone +
            '&role' +
            role +
            '&address' +
            address +
            '&bio' +
            bio +
            '&status' +
            status +
            '&fromdob' +
            fromdob +
            '&todob' +
            todob +
            '&frombanned' +
            frombanned +
            '&tobanned' +
            tobanned +
            '&fromdeleted' +
            fromdeleted +
            '&todeleted' +
            todeleted +
            '&page' +
            page +
            '&size' +
            size
    )
}

const UserService = {
    getUser,
    updateUser,
    checkMatchPassword,
    changePassword,
    deleteUser,
    sendResetPasswordEmail,
    filterUser,
}

export default UserService
