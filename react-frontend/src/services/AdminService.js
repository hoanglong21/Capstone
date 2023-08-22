import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST + '/statistic'

const getRegisterNumber = () => {
    return axios.get(API_BASE_URL + '/overview/registernumber', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getClassNumber = () => {
    return axios.get(API_BASE_URL + '/overview/classnumber', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getStudySetNumber = () => {
    return axios.get(API_BASE_URL + '/overview/studysetnumber', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getAccessNumber = () => {
    return axios.get(API_BASE_URL + '/overview/accessnumber', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getUserGrowth = () => {
    return axios.get(API_BASE_URL + '/overview/usergrowth', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getStudySetGrowth = () => {
    return axios.get(API_BASE_URL + '/overview/studysetgrowth', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const AdminService = {
    getRegisterNumber,
    getClassNumber,
    getStudySetNumber,
    getAccessNumber,
    getUserGrowth,
    getStudySetGrowth,
}

export default AdminService
