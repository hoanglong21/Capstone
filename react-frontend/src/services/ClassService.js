import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createClassroom = (newClass) => {
    return axios.post(API_BASE_URL + '/class', newClass)
}

const ClassService = {
    createClassroom,
}

export default ClassService
