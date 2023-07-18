import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createAnswers = (answers) => {
    return axios.post(API_BASE_URL + '/createanswers', answers)
}

const AnswerService = {
    createAnswers,
}

export default AnswerService
