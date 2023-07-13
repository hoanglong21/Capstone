import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createAssignment = (assignment) => {
    return axios.post(API_BASE_URL + '/assignments', assignment)
}

const AssignmentService = {
    createAssignment,
}

export default AssignmentService
