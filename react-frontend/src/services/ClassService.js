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

const deleteClass = (id) => {
    return axios.delete(API_BASE_URL + '/class/' + id)
}

const getClassroomById = (id) => {
    return axios.get(API_BASE_URL + '/class/' + id)
}

const resetClassCode = (id) => {
    return axios.post(API_BASE_URL + '/resetclasscode/' + id)
}

const getFilterList = (
    is_deleted,
    search,
    author,
    learner,
    from,
    to,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterclass?deleted' +
            is_deleted +
            '&search' +
            search +
            '&author' +
            author +
            '&learner' +
            learner +
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
    deleteClass,
    resetClassCode,
}

export default ClassService
