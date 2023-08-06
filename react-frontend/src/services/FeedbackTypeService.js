import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const getAll = () => {
    return axios.get(API_BASE_URL + '/feedbacktype')
}

const FeedbackTypeService = {
    getAll,
}

export default FeedbackTypeService
