import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createSubmission = (submission) => {
    return axios.post(API_BASE_URL + '/submissions', submission)
}

const updateSubmission = (id, submission) => {
    return axios.put(API_BASE_URL + '/submissions/' + id, submission)
}

const getSubmissionById = (id) => {
    return axios.get(API_BASE_URL + '/submissions/' + id)
}

const getSubmissionByAuthorIdandAssignmentId = (authorId, assignmentId) => {
    return axios.get(
        API_BASE_URL +
            '/submissionbyauthorandassignment?authorid=' +
            authorId +
            '&assignmentid=' +
            assignmentId
    )
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
    getFilterList,
    getSubmissionByAuthorIdandAssignmentId,
    createSubmission,
    updateSubmission,
}

export default SubmissionService
