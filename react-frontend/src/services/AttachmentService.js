import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getAttachmentsByPostId = (id) => {
    return axios.get(API_BASE_URL + '/attachmentsbypostid/' + id)
}

const createAttachments = (attachments) => {
    return axios.post(API_BASE_URL + '/createattachments', attachments)
}

const getAttachmentsByAssignmentId = (id) => {
    return axios.get(API_BASE_URL + '/attachmentsbyassignmentid/' + id)
}

const AttachmentService = {
    getAttachmentsByPostId,
    createAttachments,
    getAttachmentsByAssignmentId,
}

export default AttachmentService
