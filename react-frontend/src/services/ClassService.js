import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createClassroom = (newClass) => {
    return axios.post(API_BASE_URL + '/class', newClass)
}

const joinClass = (classCode, username) => {
    return axios.post(
        API_BASE_URL +
            '/joinclass?classCode=' +
            classCode +
            '&username=' +
            username
    )
}

const updateClassroom = (classRequest, id) => {
    return axios.put(API_BASE_URL + '/class/' + id, classRequest)
}

const getClassroomById = (id) => {
    return axios.get(API_BASE_URL + '/class/' + id)
}

const getFilterList = (is_deleted, search, author, from, to, page, size) => {
    return axios.get(
        API_BASE_URL +
            '/filterclass?deleted' +
            is_deleted +
            '&search' +
            search +
            '&author' +
            author +
            (from ? `&from${from}` : '') +
            (to ? `&to${to}` : '') +
            '&page' +
            page +
            '&size' +
            size
    )
}

const ClassService = {
    createClassroom,
    getFilterList,
    joinClass,
    getClassroomById,
    updateClassroom,
}

export default ClassService
