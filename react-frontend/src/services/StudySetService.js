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

const getFilterList = (
    is_deleted,
    is_public,
    is_draft,
    search,
    author,
    type,
    from,
    to,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterstudysets?deleted' +
            is_deleted +
            '&public' +
            is_public +
            '&draft' +
            is_draft +
            '&search' +
            search +
            '&author' +
            author +
            '&type' +
            type +
            (from ? `&from${from}` : '') +
            (to ? `&to${to}` : '') +
            '&page' +
            page +
            '&size' +
            size
    )
}

const StudySetService = {
    createStudySet,
    updateStudySet,
    deleteStudySet,
    getStudySetById,
    checkStudySet,
    getAllStudySetByUser,
    getFilterList,
}

export default StudySetService
