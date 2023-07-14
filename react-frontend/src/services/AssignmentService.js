import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createAssignment = (assignment) => {
    return axios.post(API_BASE_URL + '/assignments', assignment)
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
}

export default AssignmentService
