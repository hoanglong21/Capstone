import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createStudySet = (studySet) => {
    return axios.post(API_BASE_URL + '/studysets', studySet, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const FieldService = {
    createStudySet,
}

export default FieldService
