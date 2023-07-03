import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createFeedback = (feedback) => {
    return axios.post(API_BASE_URL + '/feedbacks', feedback)
}

const FeedbackService = {
    createFeedback,
}

export default FeedbackService
