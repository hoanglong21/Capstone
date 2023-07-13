import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createCard = (card) => {
    return axios.post(API_BASE_URL + '/cards', card, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const updateCard = (id, cardDetails) => {
    return axios.put(API_BASE_URL + '/cards/' + id, cardDetails, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getAllByStudySetId = (studySetId) => {
    return axios.get(API_BASE_URL + '/cardbystudysetid?id=' + studySetId)
}

const deleteCard = (id) => {
    return axios.delete(API_BASE_URL + '/cards/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const CardService = {
    createCard,
    updateCard,
    getAllByStudySetId,
    deleteCard,
}

export default CardService
