import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_HOST

const createQuestions = (questions) => {
    return axios.post(API_BASE_URL + '/createquestions', questions)
}

const createQuestion = (question) => {
    return axios.post(API_BASE_URL + '/questions', question)
}

const deleteQuestion = (id) => {
    return axios.delete(API_BASE_URL + '/questions/' + id)
}

const getAllByTestId = (testId) => {
    return axios.get(API_BASE_URL + '/questionsbytestid?id=' + testId)
}

const updateQuestion = (id, question) => {
    return axios.put(API_BASE_URL + '/questions/' + id, question)
}

const QuestionService = {
    createQuestions,
    createQuestion,
    deleteQuestion,
    getAllByTestId,
    updateQuestion,
}

export default QuestionService
