import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getSubmissionById = (id) =>{
    return axios.get(API_BASE_URL + '/submissions/' + id)
}

const getFilterList = (search, authorid, assignmentid, mark, page, size) => {
    return axios.get(
        API_BASE_URL +
            '/filtersubmission?search' +
            search +
            '&authorid' +
            authorid +
            '&assignmentid' +
            assignmentid +
            '&mark' +
            mark +
            '&page' +
            page +
            '&size' +
            size
    )
}

const SubmissionService = {
    getSubmissionById,
    getFilterList
}

export default SubmissionService