import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createHistory = (history) => {
    return axios.post(API_BASE_URL + '/histories', history, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const FieldService = {
    createHistory,
}

export default FieldService
