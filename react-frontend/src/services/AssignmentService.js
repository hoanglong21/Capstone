import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createAssignment = (assignment) => {
    return axios.post(API_BASE_URL + '/assignments', assignment)
}

const getAssignmentById = (id) => {
    return axios.get(API_BASE_URL + '/assignments/' + id)
}

const updateAssignment = (id, assignment) => {
    return axios.put(API_BASE_URL + '/assignments/' + id, assignment)
}

const deleteAssignment = (id) => {
    return axios.delete(API_BASE_URL + '/assignments/' + id)
}

const getFilterList = (
    search,
    author,
    from,
    to,
    draft,
    direction,
    classId,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterassignment?search' +
            search +
            '&author' +
            author +
            (from ? `&from${from}` : '') +
            (to ? `&to${to}` : '') +
            '&draft' +
            draft +
            '&direction' +
            direction +
            '&classid' +
            classId +
            '&page' +
            page +
            '&size' +
            size
    )
}

const AssignmentService = {
    createAssignment,
    getFilterList,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
}

export default AssignmentService
