import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

class ContentService {
    createContent(content) {
        return axios.post(API_BASE_URL + '/contents', content)
    }

    updateContent(id, contentDetails) {
        return axios.put(API_BASE_URL + '/contents/' + id, contentDetails)
    }
}

export default new ContentService()
