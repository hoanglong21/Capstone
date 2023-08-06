import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createContent = (content) => {
    return axios.post(API_BASE_URL + '/contents', content, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const updateContent = (id, contentDetails) => {
    return axios.put(API_BASE_URL + '/contents/' + id, contentDetails, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
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
