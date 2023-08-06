import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const getAttachmentsByPostId = (id) => {
    return axios.get(API_BASE_URL + '/attachmentsbypostid/' + id)
}

const createAttachment = (attachment) => {
    return axios.post(API_BASE_URL + '/attachments', attachment)
}

const createAttachments = (attachments) => {
    return axios.post(API_BASE_URL + '/createattachments', attachments)
}

const getAttachmentsByAssignmentId = (id) => {
    return axios.get(API_BASE_URL + '/attachmentsbyassignmentid/' + id)
}

const getAttachmentsBySubmissionId = (id) => {
    return axios.get(API_BASE_URL + '/attachmentsbysubmissionid/' + id)
}

const deleteAttachment = (id) => {
    return axios.delete(API_BASE_URL + '/attachments/' + id)
}

const AttachmentService = {
    getAttachmentsByPostId,
    createAttachments,
    getAttachmentsByAssignmentId,
    getAttachmentsBySubmissionId,
    createAttachment,
    deleteAttachment,
}

export default AttachmentService
