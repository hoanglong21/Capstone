import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createStudySet = (studySet) => {
    return axios.post(API_BASE_URL + '/studysets', studySet)
}

const updateStudySet = (id, studySetDetails) => {
    return axios.put(API_BASE_URL + '/studysets/' + id, studySetDetails)
}

const deleteStudySet = (id) => {
    return axios.delete(API_BASE_URL + '/studysets/' + id)
}

const getStudySetById = (id) => {
    return axios.get(API_BASE_URL + '/studysets/' + id)
}

const checkStudySet = (id) => {
    return axios.get(API_BASE_URL + '/checkstudyset/' + id)
}

const getAllStudySetByUser = (username) => {
    return axios.get(API_BASE_URL + '/studysetAuthor/' + username)
}

const StudySetService = {
    createStudySet,
    updateStudySet,
    deleteStudySet,
    getStudySetById,
    checkStudySet,
    getAllStudySetByUser,
}

export default StudySetService
