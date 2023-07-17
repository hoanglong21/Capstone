import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createQuestions = (questions) => {
    return axios.post(API_BASE_URL + '/createquestions', questions)
}

const QuestionService = {
    createQuestions,
}

export default QuestionService
