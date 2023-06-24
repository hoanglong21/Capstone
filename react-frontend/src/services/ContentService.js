import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createContent = (content) => {
    return axios.post(API_BASE_URL + '/contents', content)
}

const updateContent = (id, contentDetails) => {
    return axios.put(API_BASE_URL + '/contents/' + id, contentDetails)
}

const getAllByCardId = (cardId) => {
    return axios.get(API_BASE_URL + '/contentbycardid?id=' + cardId)
}

const ContentService = {
    createContent,
    updateContent,
    getAllByCardId,
}

export default ContentService
