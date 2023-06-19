import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createContent = (content) => {
    return axios.post(API_BASE_URL + '/contents', content)
}

const updateContent = (id, contentDetails) => {
    return axios.put(API_BASE_URL + '/contents/' + id, contentDetails)
}

const ContentService = {
    createContent,
    updateContent,
}

export default ContentService
