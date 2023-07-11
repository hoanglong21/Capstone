import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getAttachmentsByPostId = (id) => {
    return axios.get(API_BASE_URL + '/attachmentsbypostid/' + id)
}

const AttachmentService = {
    getAttachmentsByPostId,
}

export default AttachmentService
